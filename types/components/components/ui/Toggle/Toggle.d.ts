import React from 'react';
export type ToggleProps = {
    active?: boolean;
    onChange: (active: boolean) => void;
    size?: 'small' | 'large';
};
export declare const Toggle: ({ onChange, active, size, }: ToggleProps) => React.JSX.Element;
