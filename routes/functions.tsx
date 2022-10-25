import { Markdown } from "../components/Markdown.tsx";
import { gfm } from "../utils/markdown.ts";
import { Head } from "$fresh/runtime.ts";
import { App } from "../components/App.tsx";
import MLoader from "../islands/Loader.tsx";

export default function Upload() {
  const text = `
export function handler() {
    console.log(Deno)
}
`;

  return (
    <App activeLink="/upload">
      <MLoader />
    </App>
  );
}
