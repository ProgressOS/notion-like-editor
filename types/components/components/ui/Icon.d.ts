import { icons } from 'lucide-react';
import React from 'react';
export type IconProps = {
    name: keyof typeof icons;
    className?: string;
    strokeWidth?: number;
};
export declare const Icon: React.MemoExoticComponent<({ name, className, strokeWidth }: IconProps) => React.JSX.Element | null>;
