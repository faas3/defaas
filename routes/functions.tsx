import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { App } from "../components/App.tsx";
import { Database } from "../utils/database.ts";
import { FuncMeta } from "../utils/types.ts";

const db = new Database();

export default function Functions(ctx: PageProps<Data>) {
  const { data } = ctx;

  return (
    <App activeLink="/functions">
      <Head>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
      </Head>
      <div class="flex flex-col items-center">
        <FunctionDetail funcs={data.funcs} />
      </div>
    </App>
  );
}

interface Data {
  funcs: Array<FuncMeta>;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const result = await db.getAll();
    return ctx.render({ funcs: result as Array<FuncMeta> });
  },
};

export function FunctionDetail(props: Data) {
  const funcs = props.funcs;

  return (
    <>
      {funcs.map((item: FuncMeta, index: number) => {
        return (
          <div class="w-11/12 max-w-4xl mx-auto mt-8  lg:gap-x-16">
            <section
              aria-labelledby="information-heading"
              class="mt-12 pt-6 border-t-1 border-gray-200"
            >
              <div class="w-full flex items-center justify-between gap-4">
                <hgroup>
                  <a
                    href={`/functions/${item.func_name}`}
                    class="relative text-3xl font-bold text-grey-800"
                  >
                    {item.func_name}
                  </a>

                  <h3 class="mt-10 text-gray-500 text-base leading-tight">
                    {item.desc}
                  </h3>

                  <a
                    class="mt-6 inline-flex items-center rounded border border-red-800 px-8 py-3 text-red-800 hover:bg-red-800 hover:text-white focus:outline-none focus:ring active:bg-red-700"
                    href={`https://mumbai.polygonscan.com/tx/${item.txn_hash}`}
                  >
                    <span class="text-sm font-medium">
                      Verify it on blockchain
                    </span>

                    <svg
                      class="ml-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </hgroup>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
