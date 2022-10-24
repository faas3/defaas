import { useState } from "preact/hooks";
import { Markdown } from "../components/Markdown.tsx";
import { Head } from "$fresh/runtime.ts";
import * as gfm from "https://deno.land/x/gfm@0.1.23/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { Database } from "../commuction/database.ts";
import { Func } from "../utils/types.ts";

export default function MLoader() {
  const [gist, setGist] = useState("");
  const db = new Database();

  return (
    <div class="rounded-2xl w-5/6 md:w-5/12 max-w-xl pt-4 pb-8 px-7">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await axiod.get(`https://api.github.com/gists/${gist}`);
          console.log(res.data);
          const files = res.data.files;
          const funcs = new Array<Func>();
          for (let key of Object.keys(files)) {
            funcs.push(
              {
                token_id: 1,
                chain_type: "polygon",
                content: files[key].content,
                txn_hash: "",
                source_gist_id: gist,
              },
            );
          }

          //   51ceeefe042a23dc6c0f218ec415ff16
          await db.insert(funcs)
          alert("publish ok")
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
