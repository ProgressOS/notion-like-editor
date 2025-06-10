declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        blockquoteFigure: {
            setBlockquote: () => ReturnType;
        };
    }
}
export declare const BlockquoteFigure: import("@tiptap/core").Node<any, any>;
export default BlockquoteFigure;
