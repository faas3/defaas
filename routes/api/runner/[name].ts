import { HandlerContext } from "$fresh/server.ts";
import { db } from "../../../utils/database.ts";
import { importString } from "https://deno.land/x/import@v0.1.6/mod.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const { name } = _ctx.params;
  const data = await db.findByName(name);
  const func = data[0];
  let payload = await _req.json();
  if (typeof payload == "string") {
    payload = JSON.parse(payload);
  }

  const mod = await importString(func.content ?? "");
  const result = await mod.handler(payload);

  return Response.json(result);
};
