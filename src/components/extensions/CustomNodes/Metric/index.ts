import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TagAutocomplete, { TagAutocompleteVariant } from "../TagAutocomplete";
import { icons } from "lucide-react";

export interface MetricOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    metric: {
      setMetric: (options: {
        text?: string;
        variant?: "default" | "success" | "warning" | "error";
        color?: string;
        bgColor?: string;
        icon?: keyof typeof icons;
        selectedId?: string | null;
        tagType?: TagAutocompleteVariant;
      }) => ReturnType;
    };
  }
}

export const Metric = Node.create<MetricOptions>({
  name: "metric",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      text: {
        default: "Metric",
        parseHTML: (element) => element.getAttribute("data-text"),
        renderHTML: (attributes) => {
          if (!attributes.text) return {};
          return { "data-text": attributes.text };
        },
      },
      variant: {
        default: "default",
        parseHTML: (element) => element.getAttribute("data-variant"),
        renderHTML: (attributes) => {
          if (!attributes.variant) return {};
          return { "data-variant": attributes.variant };
        },
      },
      color: {
        default: "#3b82f6",
        parseHTML: (element) => element.getAttribute("data-color"),
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return { "data-color": attributes.color };
        },
      },
      bgColor: {
        default: "#EFF6FF",
        parseHTML: (element) => element.getAttribute("data-bg-color"),
        renderHTML: (attributes) => {
          if (!attributes.bgColor) return {};
          return { "data-bg-color": attributes.bgColor };
        },
      },
      icon: {
        default: "ChartLine",
        parseHTML: (element) => element.getAttribute("data-icon"),
        renderHTML: (attributes) => {
          if (!attributes.icon) return {};
          return { "data-icon": attributes.icon };
        },
      },
      selectedId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-selected-id"),
        renderHTML: (attributes) => {
          if (!attributes.selectedId) return {};
          return { "data-selected-id": attributes.selectedId };
        },
      },
      tagType: {
        default: TagAutocompleteVariant.Metric,
        parseHTML: (element) => element.getAttribute("data-tag-type"),
        renderHTML: (attributes) => {
          if (!attributes.tagType) return {};
          return { "data-tag-type": attributes.tagType };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="metric"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-type": "metric" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TagAutocomplete);
  },

  addCommands() {
    return {
      setMetric:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
