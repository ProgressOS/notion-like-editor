import React, { ButtonHTMLAttributes, HTMLProps } from "react";
import { ButtonProps } from "./Button";
export type ToolbarWrapperProps = {
    shouldShowContent?: boolean;
    isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;
export type ToolbarDividerProps = {
    horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;
export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    activeClassname?: string;
    tooltip?: string;
    tooltipShortcut?: string[];
    buttonSize?: ButtonProps["buttonSize"];
    variant?: ButtonProps["variant"];
};
export declare const Toolbar: {
    Wrapper: React.ForwardRefExoticComponent<Omit<ToolbarWrapperProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Divider: React.ForwardRefExoticComponent<Omit<ToolbarDividerProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
        active?: boolean;
        activeClassname?: string;
        tooltip?: string;
        tooltipShortcut?: string[];
        buttonSize?: ButtonProps["buttonSize"];
        variant?: ButtonProps["variant"];
    } & React.RefAttributes<HTMLButtonElement>>;
};
