import React from "react";
export type ColorButtonProps = {
    color?: string;
    active?: boolean;
    onColorChange?: (color: string) => void;
};
export declare const ColorButton: React.MemoExoticComponent<({ color, active, onColorChange }: ColorButtonProps) => React.JSX.Element>;
