export declare const ExtensionKit: ({ onUpload, }: {
    onUpload?: (file: File) => string | Promise<string>;
}) => (import("@tiptap/core").Extension<any, any> | import("@tiptap/core").Node<any, any> | import("@tiptap/core").Mark<import("@tiptap/extension-underline").UnderlineOptions, any>)[];
export default ExtensionKit;
