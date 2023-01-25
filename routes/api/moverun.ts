import { HandlerContext } from "$fresh/server.ts";
import { importString } from "https://deno.land/x/import/mod.ts";
import { Database } from "../../utils/database.ts";

const db = new Database();

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const payload = await _req.json();
  console.log(`payload: ${payload}`);
  const data = await db.find_by_name(payload.name);

  const func = data[0];
  if (func.name != payload.name) {
    return Response.json({ error: "name is not equal" });
  }

  console.log(func.content);
  const mod = await importString(func.content);
  const result = await mod.handler();
  return Response.json(result);
};
