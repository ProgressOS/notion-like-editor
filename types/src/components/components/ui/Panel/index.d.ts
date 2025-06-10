import React from 'react';
export type PanelProps = {
    spacing?: 'medium' | 'small';
    noShadow?: boolean;
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Panel: React.ForwardRefExoticComponent<{
    spacing?: "medium" | "small";
    noShadow?: boolean;
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const PanelDivider: React.ForwardRefExoticComponent<{
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const PanelHeader: React.ForwardRefExoticComponent<{
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const PanelSection: React.ForwardRefExoticComponent<{
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const PanelHeadline: React.ForwardRefExoticComponent<{
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const PanelFooter: React.ForwardRefExoticComponent<{
    asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
