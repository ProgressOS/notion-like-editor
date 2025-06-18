import { Editor } from "@tiptap/core";
import { Group } from "./types";

export const GROUPS: Group[] = [
  {
    name: "format",
    title: "Formattazione",
    commands: [
      {
        name: "heading1",
        label: "Intestazione",
        iconName: "Heading1",
        description: "Intestazione con alta priorità",
        aliases: ["h1"],
        action: (editor: Editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: "heading2",
        label: "Intestazione media",
        iconName: "Heading2",
        description: "Intestazione con priorità media",
        aliases: ["h2"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: "heading3",
        label: "Intestazione bassa",
        iconName: "Heading3",
        description: "Intestazione con bassa priorità",
        aliases: ["h3"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: "bulletList",
        label: "Lista puntata",
        iconName: "List",
        description: "Elenco di elementi puntati",
        aliases: ["ul"],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: "numberedList",
        label: "Lista numerata",
        iconName: "ListOrdered",
        description: "Elenco di elementi numerati",
        aliases: ["ol"],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: "taskList",
        label: "Check list",
        iconName: "ListTodo",
        description: "Elenco di attività da completare",
        aliases: ["todo"],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        name: "blockquote",
        label: "Citazione",
        iconName: "Quote",
        description: "Citazione o blocco di testo citato",
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: "codeBlock",
        label: "Snippet di codice",
        iconName: "SquareCode",
        description: "Inserisce un blocco di codice",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
    ],
  },
  {
    name: "insert",
    title: "Organizzazione",
    commands: [
      {
        name: "horizontalRule",
        label: "Linea orizzontale",
        iconName: "Minus",
        description: "Inserisce una linea orizzontale",
        aliases: ["hr"],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
    ],
  },
];

export default GROUPS;
