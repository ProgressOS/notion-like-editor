import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => {
  const textAreaClassName = cn(
    "bg-black/5 border-0 rounded-lg block text-black text-sm font-medium h-[4.5rem] px-2 py-1 w-full",
    "hover:bg-black/10",
    "dark:hover:bg-white/20",
    "focus:bg-transparent active:bg-transparent focus:outline focus:outline-black active:outline active:outline-black",
    "dark:focus:outline-white dark:active:outline-white",
    className
  );

  return <textarea className={textAreaClassName} ref={ref} {...rest} />;
});

Textarea.displayName = "Textarea";
