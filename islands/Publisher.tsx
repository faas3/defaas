import { useState } from "preact/hooks";
import axiod from "axiod";
import { Database } from "../utils/database.ts";
import { FuncMeta } from "../utils/types.ts";
import { providers } from "ethers";
import { contract, yourContract } from "../utils/contract.ts";

const db = new Database();
async function addToPg(func: FuncMeta) {
  await db.insert([func]);
}

// deno-lint-ignore no-explicit-any
async function addToChain(ethereum: any, func: FuncMeta) {
  const provider = new providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract2 = contract.connect(signer);

  const txn = await contract2.mintWithMeta(JSON.stringify(func));
  return txn;
}

export default function Publisher() {
  const [gist, setGist] = useState("");

  const { ethereum } = window;

  return (
    <div class="w-11/12 max-w-4xl mx-auto mt-8  lg:gap-x-16">
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

          const func: FuncMeta = {
            ...metadata,
            txn_hash: txn.hash,
            owner_addr: txn.from,
            token_id: 1,
          };

          await addToPg(func);

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
          class="mt-6 inline-flex items-center rounded border border-red-800 px-8 py-3 text-red-800 hover:bg-red-800 hover:text-white focus:outline-none focus:ring active:bg-red-700"
          type="submit"
        >
          Publish it to blockchain
        </button>
      </form>
    </div>
  );
}
