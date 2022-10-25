import { useState } from "preact/hooks";
import { Markdown } from "../components/Markdown.tsx";
import { Head } from "$fresh/runtime.ts";
import * as gfm from "https://deno.land/x/gfm@0.1.23/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { Database } from "../commuction/database.ts";
import { FuncMeta } from "../utils/types.ts";
import { ethers, providers } from "https://cdn.skypack.dev/ethers";
import { contract, yourContract } from "../commuction/contract.ts";

const db = new Database();
async function addToPg(func: FuncMeta) {
  await db.insert([func]);
}

async function addToChain(ethereum: any, func: FuncMeta) {
  const provider = new providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract2 = contract.connect(signer);

  const txn = await contract2.mintWithMeta(JSON.stringify(func));
  return txn;
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
          const files = res.data.files;
          //   await addToPg(files, gist);
          const value = Object.values(files)[0];

          const metadata = {
            source_gist_id: gist,
            func_name: value.filename,
            desc: res.data.description,
            content: value.content,

            contract: yourContract.address,
            chain: "polygon",

            owner: res.data.owner.login,
          };

          const txn = await addToChain(ethereum, metadata);
          console.log("===============>");
          console.log(txn);

          const func: FuncMeta = {
            ...metadata,
            txn_hash: txn.hash,
            owner_addr: txn.from,
            token_id: 1,
          }

          await addToPg(func)

          alert(JSON.stringify(txn));
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
