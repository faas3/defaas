import { Head } from "$fresh/runtime.ts";
import { App } from "../components/App.tsx";
import { Jumbo } from "../components/Jumbo.tsx";
import { IconArrowRight } from "../components/Icons.tsx";
import { Markdown } from "../components/Markdown.tsx";

export default function Home() {
  return (
    <App activeLink="/">
      <Head>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
      </Head>
      <div class="flex flex-col items-center">
        <Jumbo>FaaS3</Jumbo>
        <p class="italic text-center text-2xl md:text-5xl font-bold leading-tight pb-7 md:pb-10">
          <span class="text-red-800">FaaS Based on Blockchain</span> toolkit
          <br />
          for <span class="text-red-800">Web3</span> developers
        </p>

        <div>
          <Markdown markdown={helpMarkdown} />
        </div>

        <div class="m-8 flex flex-row">
          <pre class="py-4 md:py-6 px-6 bg-gray-800 text-white rounded-l-lg">
            Try it!
          </pre>
          <a
            href="https://github.com/faas3/faas3-cli"
            class="block bg-red-800 rounded-r-lg text-white p-4 md:p-6"
          >
            <IconArrowRight />
          </a>
        </div>
      </div>
      <Features />
    </App>
  );
}

const helpMarkdown = `
$ faas3 --help
Usage: faas3 [COMMAND]

Commands:
  create  create the function
  deploy  deploy the function to runtime and blockchain
  run     local run
  call    remote call the function
  list    list the functions
  verify  verify the runtime function, which should equal to the on-chain code
  help    Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
`;

function Features() {
  return (
    <div class="m-10 grid md:grid-cols-4 gap-4 pb-20">
      <div class="p-2">
        <h2 class="text-xl font-black">Next-gen serverless</h2>
        {/* <p>Query RDF data from any source effortlessly.</p> */}
      </div>
      <div class="p-2">
        <h2 class="text-xl font-black">First class TypeScript</h2>
        {/* <p>Best in class developer experience. Fully typed workflow.</p> */}
      </div>
      <div class="p-2">
        <h2 class="text-xl font-black">Deploy anywhere</h2>
        {/* <p>LDkit runs in browser, Deno and Node.</p> */}
      </div>
      <div class="p-2">
        <h2 class="text-xl font-black">On-chain functions</h2>
        {/* <p>Compatible or built upon all the popular RDF/JS libraries</p> */}
      </div>
    </div>
  );
}
