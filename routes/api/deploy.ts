import { HandlerContext } from "$fresh/server.ts";
import { db } from "../../utils/database.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" });
  }

  const payload = await _req.json();
  const result = await db.insertMove([payload]);
  return Response.json(result);
};
