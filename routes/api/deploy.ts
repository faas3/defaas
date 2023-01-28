import { HandlerContext } from "$fresh/server.ts"
import { Database } from "../../utils/database.ts"

const db = new Database()

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method != "POST") {
    return Response.json({ error: "only support post" })
  }

  const payload = await _req.json()
  console.log(`payload: ${payload}`)
  const result = await db.insert_move([payload])
  return Response.json(result)
}
