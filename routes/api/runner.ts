import { HandlerContext } from "$fresh/server.ts";
import { importString } from "https://deno.land/x/import/mod.ts";
import { Database } from "../../commuction/database.ts";

const db = new Database();

const funcCache = {};

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ "error": "only support post" });
  }

  const payload = await _req.json();
  const { func_name, params } = payload;
  const mod = await loadFromCache(func_name);
  const data = await mod.handler(...params);
  return Response.json({ data });
};

async function loadFromCache(func_name: string) {
  if (funcCache[func_name]) {
    return funcCache[func_name];
  }

  // load from db
  const funcMeta = await db.getByFuncName(func_name);
  const content = funcMeta[0].content;
  // const code = await bun(content);
  const mod = await importString(content);
  funcCache[func_name] = mod;
  return mod;
}
