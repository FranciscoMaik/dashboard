import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/20",
  {
    variants: {
      variant: {
        default:
          "bg-surface-page border border-border-default text-text-secondary [a&]:hover:opacity-80",
        secondary: "bg-surface-hover text-text-primary [a&]:hover:opacity-80",
        destructive:
          "bg-status-error text-white border-transparent [a&]:hover:opacity-80",
        outline:
          "border border-border-default text-text-primary [a&]:hover:bg-surface-hover",
        ghost: "[a&]:hover:bg-surface-hover [a&]:hover:text-text-primary",
        link: "text-accent-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
