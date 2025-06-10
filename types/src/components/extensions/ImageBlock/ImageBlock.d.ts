import { Range } from "@tiptap/core";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        imageBlock: {
            setImageBlock: (attributes: {
                src: string;
            }) => ReturnType;
            setImageBlockAt: (attributes: {
                src: string;
                pos: number | Range;
            }) => ReturnType;
            setImageBlockAlign: (align: "left" | "center" | "right") => ReturnType;
            setImageBlockWidth: (width: number) => ReturnType;
        };
    }
}
export declare const ImageBlock: import("@tiptap/react").Node<import("@tiptap/extension-image").ImageOptions, any>;
export default ImageBlock;
