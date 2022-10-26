import { HandlerContext } from "$fresh/server.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

import { importString } from "https://deno.land/x/import/mod.ts";
import { Database } from "../../commuction/database.ts";

const db = new Database();

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ "error": "only support post" });
  }

  const payload = await _req.json();
  let { func_name, params } = payload;
  const funcMeta = await db.getByFuncName(func_name);
  const mod = await importString(`${funcMeta[0].content}`);
  const data = await mod.handler(...params);
  return Response.json({ data });
};
