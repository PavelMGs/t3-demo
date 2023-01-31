import type { GetServerSidePropsContext} from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import { appRouter } from '../server/api/root';
import { createTRPCContext } from "../server/api/trpc";
import ReactPaginate from 'react-paginate';
import ProductCard from "../components/ProductCard/ProductCard";
import useDebounce from "../hooks/useDebounce";

import { api } from "../utils/api";
import { useRouter } from "next/router";

type Route = { 
  query?: Record<string, string | number>,
  pathname: string,
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500)
  const debouncedSearchRef = useRef('');
  const router = useRouter();
  const { query } = router;

  const { data } = api.example.getProducts.useQuery({ search: debouncedSearch, page: +(query?.page || 1) - 1 }) || { data: [0, []] }
  const count = useMemo(() => data?.[0], [data]);
  const products = useMemo(() => data?.[1], [data]);

  const handleChangeRoute = async (route: Route) => {
    await router.push(route);
  }

  const handlePageClick = (page: { selected: number }) => {
    if (page.selected > 0) {
      void handleChangeRoute({
        pathname: router.pathname,
        query: { page: page.selected + 1 }
      })
    } else {
      void handleChangeRoute({
        pathname: router.pathname
      })
    }
  }

  useEffect(() => {
    if (debouncedSearchRef.current !== debouncedSearch && query.page) {
      void handleChangeRoute({
        pathname: router.pathname
      })
    }
    debouncedSearchRef.current = debouncedSearch;
  }, [debouncedSearch])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center h-full min-h-screen overflow-hidden">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="my-5 w-3/6 p-1 rounded shadow-md" placeholder="Tap to search" />
        <div className="grid grid-cols-3 gap-4 mx-auto w-3/6">
          {
            products?.map((product) => <ProductCard key={product.id} {...product} />)
          }
        </div>
        {count && count > 10 &&
          <nav aria-label="Page navigation example" className="my-5 mx-auto">
            <ReactPaginate
              initialPage={+(query?.page || 1) - 1}
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(count / 10)}
              previousLabel="Previous"
              renderOnZeroPageCount={() => null}
              previousClassName="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              containerClassName="inline-flex -space-x-px"
              pageLinkClassName={"px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
              pageClassName="flex"
              activeLinkClassName="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </nav>
        }
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const ssg = createProxySSGHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/await-thenable
    ctx: await createTRPCContext(),
    transformer: superjson,
  });

  const page = +(context.query?.page || 1) - 1;

  await ssg.example.getProducts.fetch({ page, search: '' });
  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
}
