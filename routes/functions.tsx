import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { App } from "../components/App.tsx";
import { Jumbo } from "../components/Jumbo.tsx";
import { IconArrowRight } from "../components/Icons.tsx";
import { gfm } from "../utils/markdown.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { Markdown } from "../components/Markdown.tsx";
import { Database } from "../commuction/database.ts";
import { FuncMeta } from "../utils/types.ts";

const db = new Database();

export default function Functions(ctx: PageProps<Data>) {
  const { data } = ctx;
  console.log(data);

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
    console.log(result);
    return ctx.render({ funcs: result as Array<FuncMeta> });
  },
};

export function FunctionDetail(props: Data) {
  const funcs = props.funcs;

  return funcs.map((item: FuncMeta, index: number) => {
    return (
      <div class="mt-10 md:mt-20 grid md:grid-cols-2 gap-2 md:gap-0">
        <div>
          <h2 class="pb-5 text-2xl md:text-4xl font-black">
            {index + 1}. {item.func_name}
          </h2>
          <p class="md:mx-10 text-l md:text-xl text-gray-500">
            {item.desc} <br />
          </p>
          <a class="md:mx-10 block bg-red-800 rounded-r-lg text-white p-4 md:p-6" href={`https://mumbai.polygonscan.com/tx/${item.txn_hash}`}>
            verify it on chain
          </a>
          <p class="md:mx-10 text-l md:text-xl text-gray-500">
            {item.created_at}
          </p>
        </div>
        <div class="pb-4">
          <Markdown markdown={"\n\n" + item.content + "\n\n"} />
        </div>
      </div>
    );
  });
}
