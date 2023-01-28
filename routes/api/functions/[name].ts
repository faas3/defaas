import { HandlerContext } from "$fresh/server.ts"
import { Database } from "../../../utils/database.ts"

const db = new Database()

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "GET") {
    return Response.json({ error: "only support get" })
  }

  const { name } = _ctx.params
  console.log(name)
  const funcs = await db.find_by_name(name)

  return Response.json(funcs[0])
}
