import React from "react";
import { JSONContent } from "@tiptap/react";
import { Editor as EditorType } from "@tiptap/core";
import "./editor.css";
import "./globals.css";
import "./styles/index.css";
import "./styles/partials/code.css";
import "./styles/partials/lists.css";
import "./styles/partials/table.css";
import "./styles/partials/collab.css";
import "./styles/partials/blocks.css";
import "./styles/partials/animations.css";
import "./styles/partials/typography.css";
import "./styles/partials/placeholder.css";
interface EditorProps {
    /**
     * This prop use to change the editor mode from "preview" to "edit" mode.
     * Defaults to 'light'.
     */
    editable?: boolean;
    /**
     * This prop use for the editor theme palette.
     * Defaults to 'light'.
     */
    mode?: "dark" | "light";
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    content?: JSONContent | string;
    /**
     * A callback function that is called whenever the editor is updated
     */
    onUpdate?: (editor: EditorType) => void;
    /**
     * A callback function that is called whenever the image upload
     */
    onUploadImage?: (file: File) => string | Promise<string>;
}
declare const Editor: React.FC<EditorProps>;
export { Editor, EditorProps };
