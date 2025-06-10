import { Editor } from '@tiptap/react';
import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
export declare const isColumnGripSelected: ({ editor, view, state, from, }: {
    editor: Editor;
    view: EditorView;
    state: EditorState;
    from: number;
}) => boolean;
export default isColumnGripSelected;
