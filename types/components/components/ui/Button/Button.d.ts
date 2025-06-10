import React from "react";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "quaternary" | "ghost";
export type ButtonSize = "medium" | "small" | "icon" | "iconSmall";
export type ButtonProps = {
    variant?: ButtonVariant;
    active?: boolean;
    activeClassname?: string;
    buttonSize?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: React.ForwardRefExoticComponent<{
    variant?: ButtonVariant;
    active?: boolean;
    activeClassname?: string;
    buttonSize?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
