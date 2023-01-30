import { HandlerContext } from "$fresh/server.ts";
import { importString } from "https://deno.land/x/import@v0.1.7/mod.ts";
import { Database } from "../../utils/database.ts";
import * as aptos from "npm:aptos";

const __innerSDK = { aptos };

const db = new Database();
export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const payload = await _req.json();
  console.log(`payload: `);
  console.log(payload);
  const data = await db.find_with_cache(payload.name);

  const func = data[0];
  if (func.name != payload.name) {
    return Response.json({ error: "name is not equal" });
  }

  console.log("function content: ");
  console.log(func.content);

  console.log("\n--------function log start---------");
  const mod = await importString(func.content);
  const result = await mod.handler(payload, __innerSDK);
  console.log("--------function log end-----------\n");

  console.log("function result: ");
  console.log(result);

  return Response.json(result);
};
