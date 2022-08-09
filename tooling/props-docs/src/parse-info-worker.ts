import path from "node:path"
import { parentPort, workerData } from "node:worker_threads"
import { propNames } from "@chakra-ui/styled-system"
import { withCustomConfig } from "react-docgen-typescript"

const rootDir = path.join(__dirname, "..", "..", "..")
const sourcePath = path.join(rootDir, "packages")
const tsConfigPath = path.join(sourcePath, "..", "tsconfig.json")

const excludedPropNames = propNames.concat([
  "as",
  "apply",
  "sx",
  "__css",
  "css",
])

const { parse } = withCustomConfig(tsConfigPath, {
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop, component) => {
    const isStyledSystemProp = excludedPropNames.includes(prop.name)
    const isHTMLElementProp =
      prop.parent?.fileName.includes("node_modules") ?? false
    const isHook = component.name.startsWith("use")
    const isTypeScriptNative =
      prop.parent?.fileName.includes("node_modules/typescript") ?? false

    return (
      (isHook && !isTypeScriptNative) ||
      !(isStyledSystemProp || isHTMLElementProp)
    )
  },
})

if (parentPort) {
  parentPort.postMessage(parse(workerData))
}
