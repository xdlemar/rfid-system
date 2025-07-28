import React from "react";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef(({ className, children, htmlFor, ...props }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-white mb-1",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";
