import { Markdown } from "../components/Markdown.tsx";
import { gfm } from "../utils/markdown.ts";
import { Head } from "$fresh/runtime.ts";
import { App } from "../components/App.tsx";
import MLoader from "../islands/Loader.tsx";

export default function Upload() {
  return (
    <App activeLink="/functions">
      <MLoader />
    </App>
  );
}
