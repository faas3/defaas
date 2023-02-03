import { HandlerContext } from "$fresh/server.ts";
import { Database } from "../../../utils/database.ts";
import { importString } from "https://deno.land/x/import@v0.1.6/mod.ts";

const db = new Database();

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const { name } = _ctx.params;
  const data = await db.find_by_name(name);
  const func = data[0];
  let payload = await _req.json();
  if (typeof payload == "string") {
    payload = JSON.parse(payload);
  }

  console.log("function content: ");
  console.log(func.content);

  console.log("\n--------function log start---------");
  const mod = await importString(func.content);
  const result = await mod.handler(payload);
  console.log("--------function log end-----------\n");

  console.log("function result: ");
  console.log(result);

  return Response.json(result);
};
