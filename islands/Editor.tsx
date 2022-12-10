import { useEffect, useState } from "preact/hooks";
import axiod from "axiod";
import { Database } from "../utils/database.ts";
import { FuncMeta } from "../utils/types.ts";
import { providers } from "ethers";
import { contract, yourContract } from "../utils/contract.ts";
import Textarea from "../components/Textarea.tsx";

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
  const spaces = 4;
  const [gist, setGist] = useState("");

  const [text, setText] = useState({
    value: `// Write your code here...
export function handler(req) {
    console.log(req)
}`,
    caret: -1,
    target: null,
  } as any);

  useEffect(() => {
    if (text.caret >= 0) {
      text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
    }
  }, [text]);
  const handleTab = (e: any) => {
    let content = e.target.value;
    let caret = e.target.selectionStart;

    if (e.key === "Tab") {
      e.preventDefault();

      let newText = content.substring(0, caret) + " ".repeat(spaces) +
        content.substring(caret);

      setText({ value: newText, caret: caret, target: e.target });
    }
  };

  const handleText = (e: any) =>
    setText({ value: e.target.value, caret: -1, target: e.target });

  const { ethereum } = window;

  return (
    <div class="w-11/12 max-w-4xl mx-auto mt-8  lg:gap-x-16">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const metadata = {
            source_gist_id: "",
            func_name: gist,
            desc: "",
            content: text.value,

            contract: yourContract.address,
            chain: "polygon",

            owner: "admin",
            txn_hash: "",
            owner_addr: "",
            token_id: 1,
          };


          const func: FuncMeta = {
            ...metadata,
          };

          await addToPg(func);
          alert(JSON.stringify(func))
        }}
      >
        <label>
          <div class="mb-2.5">
            <p class="font-semibold">Function Name</p>
            <p class="font-medium text-xs text-gray-500">
              {`>> The name of your function.`}
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
          <Textarea
            onChange={handleText}
            onKeyDown={handleTab}
            value={text.value}
            rows={15}
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
