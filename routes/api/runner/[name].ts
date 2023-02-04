import { HandlerContext } from "$fresh/server.ts";
import { db } from "../../../utils/database.ts";
import { importString } from "import";
import axiod from "axiod";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const { name } = _ctx.params;
  let payload = await _req.json();
  if (typeof payload == "string") {
    payload = JSON.parse(payload);
  }

  const data = await db.findByName(name);
  const func = data[0];

  let result;
  if (func.template === "deno") {
    result = await runDeno(func.content!, payload);
  } else if (func.template === "node") {
    result = await runNode(func.content!, payload);
  } else {
    result = { reason: "unsupported template" };
  }

  return Response.json(result);
};

async function runDeno(content: string, payload: any) {
  console.log("running in deno...");
  const mod = await importString(content);
  return await mod.handler(payload);
}

async function runNode(content: string, payload: any) {
  console.log("running in node...");
  const result = await axiod.post(
    "https://faas3-next.up.railway.app/api/runtime",
    { content, payload },
  );
  return result.data;
}
