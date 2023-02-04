import { HandlerContext } from "$fresh/server.ts";
import { db } from "../../utils/database.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "GET") {
    return Response.json({ error: "only support get" });
  }

  const result = await db.findAll();
  return Response.json(result);
};
