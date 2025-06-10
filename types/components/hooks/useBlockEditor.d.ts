import { JSONContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
interface IParams {
    editable?: boolean;
    content?: JSONContent | string;
    handleUpdate?: (editor: Editor) => void;
    onUploadImage?: (file: File) => string | Promise<string>;
}
export declare const useBlockEditor: ({ handleUpdate, content, editable, onUploadImage, }: IParams) => {
    editor: Editor | null;
};
export {};
