import { Editor } from "@tiptap/core";
import { Group } from "./types";
import { TagAutocompleteVariant } from "../CustomNodes/TagAutocomplete";

export const GROUPS: Group[] = [
  {
    name: "tag",
    title: "Tag",
    commands: [
      {
        name: "metric",
        label: "Metrica",
        iconName: "ChartLine",
        description: "Tag a Metric for quick access",
        aliases: ["metric"],
        action: (editor: Editor) => {
          // create a custom node for metric (basically a badge)
          editor
            .chain()
            .focus()
            .setMetric({
              text: "Metric",
              variant: "default",
              color: "#000",
              bgColor: "#FFF6CC",
              icon: "ChartLine",
              tagType: TagAutocompleteVariant.Metric,
            })
            .run();
        },
      },
      {
        name: "kpichain",
        label: "Kpi Chain",
        iconName: "Link",
        description: "Tag a Metric Chain for quick access",
        aliases: ["kpichain"],
        action: (editor: Editor) => {
          editor
            .chain()
            .focus()
            .setMetric({
              text: "Metric Chain",
              variant: "default",
              color: "#000000",
              bgColor: "#CFE9FF",
              icon: "Link",
              tagType: TagAutocompleteVariant.KpiChain,
            })
            .run();
        },
      },
      {
        name: "playbook",
        label: "Playbook",
        iconName: "LibraryBig",
        description: "Tag a playbook for quick access",
        aliases: ["playbook"],
        action: (editor: Editor) => {
          editor
            .chain()
            .focus()
            .setMetric({
              text: "Playbook",
              variant: "default",
              color: "#000",
              bgColor: "#DCCEFF",
              icon: "LibraryBig",
              tagType: TagAutocompleteVariant.Playbook,
            })
            .run();
        },
      },
    ],
  },
];

export default GROUPS;
