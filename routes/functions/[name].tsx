import { Handlers, PageProps } from "$fresh/server.ts";
import { Jumbo } from "../../components/Jumbo.tsx";
import { App } from "../../components/App.tsx";
import { FuncMeta } from "../../utils/types.ts";
import { Database } from "../../utils/database.ts";
import { Markdown } from "../../components/Markdown.tsx";
import { Head } from "$fresh/runtime.ts";
import Runner from "../../islands/Runner.tsx";

interface Data {
  func: FuncMeta;
}

const db = new Database();

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const name = ctx.params.name;
    const func = await db.getByFuncName(name);
    return ctx.render({ func: func[0] });
  },
};

export default function DocsPage(ctx: PageProps<Data>) {
  const { func } = ctx.data;

  return (
    <App activeLink="/functions">
      <Head>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
      </Head>
      <div class="w-11/12 mt-16 max-w-4xl mx-auto flex items-center justify-between relative">
        <a
          href="/functions"
          class="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.64977 3.35029C4.92235 3.07771 5.36409 3.07709 5.63743 3.34891V3.34891C5.912 3.62195 5.91244 4.06613 5.63841 4.33972L2.68999 7.28342L15.2789 7.28342C15.6746 7.28342 15.9954 7.60424 15.9954 8V8C15.9954 8.39576 15.6746 8.71658 15.2789 8.71658L2.68999 8.71658L5.639 11.6656C5.91254 11.9391 5.9113 12.383 5.63624 12.655V12.655C5.36334 12.9249 4.92371 12.9237 4.65232 12.6523L0.353606 8.35355C0.158344 8.15829 0.158345 7.84171 0.353607 7.64644L4.64977 3.35029Z"
              fill="currentColor"
            />
          </svg>
          Back to functions
        </a>
      </div>

      <div class="w-11/12 max-w-4xl mx-auto mt-8  lg:gap-x-16">
        <div>
          <div class="flex flex-col gap-4">
            <div class="w-full flex items-center justify-between gap-4">
              <hgroup>
                <h2 class="text-3xl font-bold text-gray-800">
                  {func.func_name}
                </h2>
                <h3 class="mt-6 text-gray-500 text-base leading-tight">
                  {func.owner}
                </h3>
              </hgroup>
            </div>
          </div>

          <section
            aria-labelledby="information-heading"
            class="mt-12 pt-6 border-t-1 border-gray-200"
          >
            <h2 id="information-heading" class="sr-only">
              Product desc
            </h2>

            <div class="mt-4 space-y-6">
              <li>{func.owner_addr}</li>
              <li>{func.token_id}</li>
              <li>{func.chain}</li>
              <li>{func.txn_hash}</li>
            </div>
          </section>

          <div class="mt-6 space-y-6">
            <Markdown markdown={"\n\n" + func.content + "\n\n"} />
          </div>

          <section
            aria-labelledby="information-heading"
            class="mt-12 pt-6 border-t-1 border-gray-200"
          >
            <Runner func={func} />
          </section>
        </div>
      </div>
    </App>
  );
}
