import React from 'react';
export type LinkEditorPanelProps = {
    initialUrl?: string;
    initialOpenInNewTab?: boolean;
    onSetLink: (url: string, openInNewTab?: boolean) => void;
};
export declare const useLinkEditorState: ({ initialUrl, initialOpenInNewTab, onSetLink, }: LinkEditorPanelProps) => {
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    openInNewTab: boolean;
    setOpenInNewTab: React.Dispatch<React.SetStateAction<boolean>>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    isValidUrl: boolean;
};
export declare const LinkEditorPanel: ({ onSetLink, initialOpenInNewTab, initialUrl, }: LinkEditorPanelProps) => React.JSX.Element;
