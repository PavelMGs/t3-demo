import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import db from "./db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  postProducts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.createMany({
      data: db,
    });
  }),
  getProducts: publicProcedure
    .input(z.object({ search: z.string(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma?.$transaction([
        ctx.prisma.product.count({
          where: {
            productName: {
              contains: input.search,
              mode: "insensitive",
            },
          },
        }),
        ctx.prisma.product.findMany({
          skip: input.page * 10,
          take: 10,
          where: {
            productName: {
              contains: input.search,
              mode: "insensitive",
            },
          },
        }),
      ]);
    }),
  deleteProducts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.deleteMany();
  }),
  getProduct: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findUnique({
        where: {
          id: input,
        }
      })
    })
});
