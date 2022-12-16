import prettier from "prettier";
import fs from "fs";
import { LEVEL_A, LEVEL_AA } from "../../action-vpat-report/src/wcag";

const labels: string[] = [];

labels.push("/** Label represents a GitHub issue label. */");
labels.push("export interface Label { name: string; description?: string; }");
labels.push("");
labels.push("/** Labels are the VPAT related labels we'll add. */");
labels.push("const labels : ReadonlyArray<Label> = [");
labels.push('{ name: "VPAT" },');
for (const sc of [...LEVEL_A, ...LEVEL_AA]) {
  labels.push(`{ name: "WCAG ${sc.id}", description: "${sc.name}" },`);
}
labels.push("]");
labels.push("");
labels.push("export default labels;");

const prettierConfig = prettier.resolveConfig.sync(__dirname);
const formatted = prettier.format(labels.join("\n"), {
  ...prettierConfig,
  filepath: "labels.ts",
});

fs.writeFileSync("src/labels.ts", formatted);
