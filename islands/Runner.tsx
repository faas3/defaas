import { useState } from "preact/hooks";
import axiod from "axiod";
import { FuncMeta } from "../utils/types.ts";

interface RunnerProps {
  func: FuncMeta;
}

export default function Runner(props: RunnerProps) {
  const [param, setParam] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const params = param.split(",").map((item) => item.trim());

          const result = await axiod.post("/api/runner", {
            params,
            func_name: props.func.func_name,
          });

          alert(JSON.stringify(result.data));
        }}
      >
        <label>
          <div class="mb-2.5">
            <p class="font-semibold">Request params</p>
            <p class="mt-4 font-medium text-xs text-gray-500">
              {`>> The params of your function, eg 1, 2`}
            </p>
          </div>
          <input
            class="mt-4 w-full h-9 rounded-md border border-gray-300 pl-3.5"
            type="text"
            name="param"
            id="param"
            value={param}
            onChange={(e) => setParam(e.currentTarget.value)}
          />
        </label>
        <button
          class="mt-6 inline-flex items-center rounded border border-red-800 px-8 py-3 text-red-800 hover:bg-red-800 hover:text-white focus:outline-none focus:ring active:bg-red-700"
          type="submit"
        >
          Send request
        </button>
      </form>
    </div>
  );
}
