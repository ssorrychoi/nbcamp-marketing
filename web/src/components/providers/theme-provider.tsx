"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps extends Omit<NextThemesProviderProps, 'children'> {
  children?: ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
