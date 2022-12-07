import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const name = _ctx.params.name;
  if (name === "") {
    return Response.json({ name });
  }
  return Response.json({ 1: name });
};
