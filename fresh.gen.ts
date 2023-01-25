// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_404.tsx";
import * as $2 from "./routes/api/deploy.ts";
import * as $3 from "./routes/api/moverun.ts";
import * as $4 from "./routes/api/runner.ts";
import * as $5 from "./routes/api/runtime/[...name].ts";
import * as $6 from "./routes/docs/[...slug].tsx";
import * as $7 from "./routes/editor.tsx";
import * as $8 from "./routes/functions.tsx";
import * as $9 from "./routes/functions/[name].tsx";
import * as $10 from "./routes/gfm.css.ts";
import * as $11 from "./routes/index.tsx";
import * as $12 from "./routes/move.tsx";
import * as $13 from "./routes/upload.tsx";
import * as $$0 from "./islands/Editor.tsx";
import * as $$1 from "./islands/MoveFuncs.tsx";
import * as $$2 from "./islands/Publisher.tsx";
import * as $$3 from "./islands/Runner.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_404.tsx": $1,
    "./routes/api/deploy.ts": $2,
    "./routes/api/moverun.ts": $3,
    "./routes/api/runner.ts": $4,
    "./routes/api/runtime/[...name].ts": $5,
    "./routes/docs/[...slug].tsx": $6,
    "./routes/editor.tsx": $7,
    "./routes/functions.tsx": $8,
    "./routes/functions/[name].tsx": $9,
    "./routes/gfm.css.ts": $10,
    "./routes/index.tsx": $11,
    "./routes/move.tsx": $12,
    "./routes/upload.tsx": $13,
  },
  islands: {
    "./islands/Editor.tsx": $$0,
    "./islands/MoveFuncs.tsx": $$1,
    "./islands/Publisher.tsx": $$2,
    "./islands/Runner.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
