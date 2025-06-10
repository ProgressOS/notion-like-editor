import { Editor } from "@tiptap/react";
import React from "react";
interface Props {
    getPos: () => number;
    editor: Editor;
    extension: {
        options: {
            onUpload: (file: File) => string | Promise<string>;
        };
    };
}
export declare const ImageUpload: React.FC<Props>;
export default ImageUpload;
