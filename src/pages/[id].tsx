import type { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import { appRouter } from '../server/api/root';
import { createTRPCContext } from "../server/api/trpc";
import { api } from '../utils/api';
import Link from 'next/link';

const ProductPage: NextPage = () => {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.example.getProduct.useQuery(typeof id === 'string' ? id : '');

  const handleChangeSlade = (index: number) => {
    setSlide(index)
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Link href="/" className="w-full text-center bg-black text-white">BACK TO HOME</Link>
      {
        data?.id
          ? (
            <>
              <h2 className="mx-auto my-6 text-2xl">{data?.productName}</h2>
              <div className='flex mx-auto'>
                <div className='flex flex-col h-[80vh] overflow-scroll'>
                  {
                    data.imageURLs.map((el, index) => (
                      <button key={`${el}-slider-preview`} className="h-[20%] mr-3 mb-3 last:mb-0" onClick={() => handleChangeSlade(index)}>
                        <img src={el} alt={el} className="h-full" />
                      </button>
                    ))
                  }
                </div>
                <div className="h-[80vh]">
                  <img src={data.imageURLs[slide]} alt="" className='h-[80vh]' />
                </div>
              </div>
            </>
          )
          : 'Loading...'
      }
    </div >
  )
}

export default ProductPage

export const getServerSideProps = async (context: NextPageContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/await-thenable
    ctx: await createTRPCContext(),
    transformer: superjson,
  });

  const { id } = context.query;

  await ssg.example.getProduct.fetch(typeof id === 'string' ? id : '');
  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
};
