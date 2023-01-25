import { HandlerContext } from "$fresh/server.ts";
import { importString } from "https://deno.land/x/import@v0.1.6/mod.ts";
import { Database } from "../../../utils/database.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const name = _ctx.params.name;

  if (_req.method !== "POST") {
    return Response.json({ error: "Only support post" });
  }

  const payload = await _req.json();
  const mod = await importString(code());
  const result = mod.handler(payload);

  if (name === "") {
    return Response.json({ error: "No function name" });
  }
  return Response.json(result);
};

const db = new Database();

function code(): string {
  return `
  export function handler(req) {
    console.log(req)
    return {"req": req}
  }
  `;
}
