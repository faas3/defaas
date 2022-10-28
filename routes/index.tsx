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
        <div class="flex flex-row">
          <pre class="py-4 md:py-6 px-6 bg-gray-800 text-white rounded-l-lg">
            Try it!
          </pre>
          <a
            href="/functions/sum.ts"
            class="block bg-red-800 rounded-r-lg text-white p-4 md:p-6"
          >
            <IconArrowRight />
          </a>
        </div>

        <Steps />

        <p class="text-center pt-4 md:pt-8 pb-5 md:pb-10">
          <a
            href="/docs"
            class="text-l md:text-xl flex flex-row gap-4 bg-red-800 rounded text-white p-4 md:p-6"
          >
            <span>Read the documentation</span> <IconArrowRight />
          </a>
        </p>
      </div>
      <Features />
    </App>
  );
}

const step1Markdown = `
import { type Context, setDefaultContext } from "ldkit";

const context: Context = {
  sources: ["https://dbpedia.org/sparql"],
};

setDefaultContext(context);
`;

const step2Markdown = `
import { dbo, rdfs, xsd } from "ldkit/namespaces";

const PersonSchema = {
  "@type": dbo.Person,
  name: rdfs.label,
  abstract: dbo.abstract,
  birthDate: {
    "@id": dbo.birthDate,
    "@type": xsd.date,
  },
} as const;
`;

const step3Markdown = `
import { createLens } from "ldkit";

const Persons = createLens(PersonSchema);

const adaIri = "http://dbpedia.org/resource/Ada_Lovelace";
const ada = await Persons.findByIri(adaIri);

console.log(ada.name); // Ada Lovelace
console.log(ada.birthDate); // Date object of 1815-12-10
`;

function Steps() {
  return (
    <div class="mt-10 md:mt-20 grid md:grid-cols-2 gap-2 md:gap-0">
      <div>
        <h2 class="pb-5 text-2xl md:text-4xl font-black">
          1. Write a function in Gist
        </h2>
        <p class="md:mx-10 text-l md:text-xl">
          Gist is an easy method to share snippets or excerpts of data with
          others.A gist can be either public or secret.
        </p>
      </div>
      <div class="pb-4">
        <Markdown markdown={step2Markdown} />
      </div>
      <div>
        <h2 class="pb-5 text-2xl md:text-4xl font-black">
          2. Publish it to blockchain
        </h2>
        <p class="md:mx-10 text-l md:text-xl">
          FaaS Upload can publish all valid code snippet to stored on
          blockchain. Uploading the code is achieved through dApp/Plugin which
          is decoupled from FaaS.
        </p>
      </div>
      <div class="pb-4">
        <Markdown markdown={step1Markdown} />
      </div>
      <div>
        <h2 class="pb-5 text-2xl md:text-4xl font-black">
          3. Fetch your function!
        </h2>
        <p class="md:mx-10 text-l md:text-xl">
          FaaS is a distributed Open Source FaaS platform. Individuals and
          developers can build their own FaaS service and customize their own
          on-chain functions and modules for different types of usage.
        </p>
      </div>
      <div class="pb-4">
        <Markdown markdown={step3Markdown} />
      </div>
    </div>
  );
}

function Features() {
  return (
    <div class="grid md:grid-cols-4 gap-4 pb-20">
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
