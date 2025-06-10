import { Node } from '@tiptap/core';
export declare enum ColumnLayout {
    SidebarLeft = "sidebar-left",
    SidebarRight = "sidebar-right",
    TwoColumn = "two-column"
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        columns: {
            setColumns: () => ReturnType;
            setLayout: (layout: ColumnLayout) => ReturnType;
        };
    }
}
export declare const Columns: Node<any, any>;
export default Columns;
