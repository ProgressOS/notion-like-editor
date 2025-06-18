"use client";

import { Extension } from "@tiptap/core";
import {
  BlockquoteFigure,
  CharacterCount,
  Color,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  Columns,
  Column,
  TaskItem,
  TaskList,
} from ".";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { TagCommand } from "./TagCommand";
import TagAutocomplete from "./CustomNodes/TagAutocomplete";
import { Metric } from "./CustomNodes/Metric";
import { KpiChain } from "./CustomNodes/KpiChain";
import { Playbook } from "./CustomNodes/Playbook";

const lowlight = createLowlight(common);

export const ExtensionKit = ({
  onUpload,
  extensions = [],
}: {
  onUpload?: (file: File) => string | Promise<string>;
  extensions?: Extension[];
}) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "javascript",
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  TagCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  TagAutocomplete,
  Metric,
  KpiChain,
  Playbook,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
  ...extensions,
];

export default ExtensionKit;
