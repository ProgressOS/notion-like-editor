import { Node } from "@tiptap/core";
export interface DBlockOptions {
    HTMLAttributes: Record<string, any>;
}
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        dBlock: {
            setDBlock: (position?: number) => ReturnType;
        };
    }
}
export declare const DBlock: Node<DBlockOptions, any>;
export default DBlock;
