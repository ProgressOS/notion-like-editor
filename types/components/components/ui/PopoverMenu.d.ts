import * as Popover from '@radix-ui/react-popover';
import { icons } from 'lucide-react';
import React from 'react';
export declare const Trigger: React.ForwardRefExoticComponent<Popover.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const Portal: React.FC<Popover.PopoverPortalProps>;
export type MenuProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    triggerClassName?: string;
    customTrigger?: boolean;
    isOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    withPortal?: boolean;
    tooltip?: string;
    isActive?: boolean;
};
export declare const Menu: {
    ({ customTrigger, trigger, triggerClassName, children, isOpen, withPortal, tooltip, onOpenChange, }: MenuProps): React.JSX.Element;
    displayName: string;
};
export declare const Item: ({ label, close, icon, iconComponent, disabled, onClick, isActive, }: {
    label: string | React.ReactNode;
    icon?: keyof typeof icons;
    iconComponent?: React.ReactNode;
    close?: boolean;
    disabled?: boolean;
    onClick: () => void;
    isActive?: boolean;
}) => React.JSX.Element;
export type CategoryTitle = {
    children: React.ReactNode;
};
export declare const CategoryTitle: ({ children }: CategoryTitle) => React.JSX.Element;
export declare const Divider: React.ForwardRefExoticComponent<React.RefAttributes<HTMLHRElement>>;
