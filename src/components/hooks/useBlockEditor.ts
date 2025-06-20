import { JSONContent, useEditor } from "@tiptap/react";
import { ExtensionKit } from "@/extensions/extension-kit";

// types
import { Editor, Extension } from "@tiptap/core";

interface IParams {
  editable?: boolean;
  content?: JSONContent | string;
  handleUpdate?: (editor: Editor) => void;
  onUploadImage?: (file: File) => string | Promise<string>;
}

export const useBlockEditor = ({
  handleUpdate,
  content,
  editable,
  onUploadImage,
}: IParams) => {
  const editor = useEditor(
    {
      editable,
      content,
      autofocus: true,
      onUpdate({ editor }) {
        console.log("Editor updated:", editor);
        handleUpdate?.(editor);
      },
      extensions: [...ExtensionKit({ onUpload: onUploadImage })],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    []
  );

  return { editor };
};
