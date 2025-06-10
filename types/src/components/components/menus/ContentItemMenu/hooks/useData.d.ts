import { Node } from '@tiptap/pm/model';
import { Editor } from '@tiptap/core';
export declare const useData: () => {
    currentNode: Node | null;
    currentNodePos: number;
    setCurrentNode: import("react").Dispatch<import("react").SetStateAction<Node | null>>;
    setCurrentNodePos: import("react").Dispatch<import("react").SetStateAction<number>>;
    handleNodeChange: (data: {
        node: Node | null;
        editor: Editor;
        pos: number;
    }) => void;
};
