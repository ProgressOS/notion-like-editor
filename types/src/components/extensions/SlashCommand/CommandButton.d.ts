import React from "react";
import { icons } from "lucide-react";
export type CommandButtonProps = {
    active?: boolean;
    description: string;
    icon: keyof typeof icons;
    onClick: () => void;
    title: string;
};
export declare const CommandButton: React.ForwardRefExoticComponent<CommandButtonProps & React.RefAttributes<HTMLButtonElement>>;
