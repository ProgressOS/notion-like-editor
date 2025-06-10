import React, { HTMLProps } from 'react';
export type SurfaceProps = HTMLProps<HTMLDivElement> & {
    withShadow?: boolean;
    withBorder?: boolean;
};
export declare const Surface: React.ForwardRefExoticComponent<Omit<SurfaceProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
