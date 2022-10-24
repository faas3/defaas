import { useState } from "preact/hooks";
import { Markdown } from "../components/Markdown.tsx";
import { Head } from "$fresh/runtime.ts";
import * as gfm from "https://deno.land/x/gfm@0.1.23/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { Database } from "../commuction/database.ts";
import { Func } from "../utils/types.ts";
import { ethers, providers } from "https://cdn.skypack.dev/ethers";
import { contract } from "../commuction/contract.ts";

const db = new Database();
async function addToPg(files: any, gist_id: string) {
  const funcs = new Array<Func>();
  for (let key of Object.keys(files)) {
    funcs.push(
      {
        token_id: 1,
        chain_type: "polygon",
        content: files[key].content,
        txn_hash: "",
        source_gist_id: gist_id,
      },
    );
  }

  await db.insert(funcs);
}

export default function MLoader() {
  const [gist, setGist] = useState("");

  const { ethereum } = window;

  return (
    <div class="rounded-2xl w-5/6 md:w-5/12 max-w-xl pt-4 pb-8 px-7">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          //   51ceeefe042a23dc6c0f218ec415ff16

          const res = await axiod.get(`https://api.github.com/gists/${gist}`);
          console.log(res.data);
          const files = res.data.files;
          //   await addToPg(files, gist);
          const nfts = await contract.purpose();
          console.log(nfts);

          const provider = new providers.Web3Provider(ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const c = contract.connect(signer);

        //   const a = await c.mintWithMeta(JSON.stringify(files));
        //   console.log(a)
          const meta = await c.faasCodes(
            "0x80062eE8E85fD91D82EdDdfa059f05b11863768E",
            3,
          );

          alert(meta);
        }}
      >
        <label>
          <div class="mb-2.5">
            <p class="font-semibold">GIST ID</p>
            <p class="font-medium text-xs text-gray-500">
              {`>> The gist id of your function.`}
            </p>
          </div>
          <input
            class="w-full h-9 rounded-md border border-gray-300 pl-3.5"
            type="text"
            name="gist_id"
            id="gist_id"
            value={gist}
            onChange={(e) => setGist(e.currentTarget.value)}
          />
        </label>
        <button
          class="mt-7 flex flex items-center rounded-md h-8 py-2 px-4 bg-gray-800 font-medium text-sm text-white"
          type="submit"
        >
          publish
        </button>
      </form>
    </div>
  );
}
