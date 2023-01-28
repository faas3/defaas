import { App } from "../components/App.tsx"
import MoveFuncs from "../islands/MoveFuncs.tsx"

export default function Move() {
  return (
    <App activeLink="/editor">
      <MoveFuncs />
    </App>
  )
}
