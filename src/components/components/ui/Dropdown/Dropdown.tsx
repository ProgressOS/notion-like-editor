import React from "react";
import { cn } from "@/lib/utils";

export const DropdownCategoryTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="text-[.65rem] font-semibold mb-1 uppercase text-neutral-500 dark:text-black/40 px-1.5">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const buttonClass = cn(
    "flex items-center gap-2 p-1.5 text-sm font-medium text-left w-full rounded",
    !isActive && !disabled,
    "hover:bg-gray-100",
    isActive &&
      !disabled &&
      "bg-gray-300",
    disabled && "text-neutral-400 cursor-not-allowed dark:text-black/60",
    className
  );

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
