import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}
export declare const FontSize: Extension<any, any>;
export default FontSize;
