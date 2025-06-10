import React from 'react';
export type LinkPreviewPanelProps = {
    url: string;
    onEdit: () => void;
    onClear: () => void;
};
export declare const LinkPreviewPanel: ({ onClear, onEdit, url, }: LinkPreviewPanelProps) => React.JSX.Element;
