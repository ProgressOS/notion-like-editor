import { Node } from '@tiptap/pm/model';
import { Editor } from '@tiptap/react';
import React from 'react';
interface ImageBlockViewProps {
    editor: Editor;
    getPos: () => number;
    node: Node & {
        attrs: {
            src: string;
        };
    };
    updateAttributes: (attrs: Record<string, string>) => void;
}
export declare const ImageBlockView: (props: ImageBlockViewProps) => React.JSX.Element;
export default ImageBlockView;
