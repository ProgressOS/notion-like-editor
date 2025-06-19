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
              text: "Cerca una metrica",
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
              text: "Cerca una Kpi Chain",
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
              text: "Cerca un playbook",
              variant: "default",
              color: "#000",
              bgColor: "#DCCEFF",
              icon: "LibraryBig",
              tagType: TagAutocompleteVariant.Playbook,
            })
            .run();
        },
      },
      {
        name: "team",
        label: "Team",
        iconName: "Users",
        description: "Tag a team for quick access",
        aliases: ["team"],
        action: (editor: Editor) => {
          editor
            .chain()
            .focus()
            .setMetric({
              text: "Cerca un team",
              variant: "default",
              color: "#000",
              bgColor: "#C7E52E",
              icon: "Users",
              tagType: TagAutocompleteVariant.Team,
            })
            .run();
        },
      },
      {
        name: "user",
        label: "User",
        iconName: "User",
        description: "Tag a user for quick access",
        aliases: ["user"],
        action: (editor: Editor) => {
          editor
            .chain()
            .focus()
            .setMetric({
              text: "Cerca un utente",
              variant: "default",
              color: "#000",
              bgColor: "#6EBE5D",
              icon: "User",
              tagType: TagAutocompleteVariant.User,
            })
            .run();
        },
      },
    ],
  },
];

export default GROUPS;
