import React from 'react';
export type EditLinkPopoverProps = {
    onSetLink: (link: string, openInNewTab?: boolean) => void;
};
export declare const EditLinkPopover: ({ onSetLink }: EditLinkPopoverProps) => React.JSX.Element;
