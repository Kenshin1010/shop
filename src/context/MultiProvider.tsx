import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider'; // Adjust the path accordingly

const nest = (children: React.ReactNode, component: React.ReactElement) =>
  React.cloneElement(component, { children }, children);

export type MultiProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[];
}>;

const MultiProvider: React.FC<MultiProviderProps> = ({
  children,
  providers,
}) => <React.Fragment>{providers.reduceRight(nest, children)}</React.Fragment>;

// Usage example
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MultiProvider
      providers={[
        <AuthProvider key="auth">{children}</AuthProvider>,
        <ThemeProvider key="theme">{children}</ThemeProvider>,
      ]}
    >
      {children}
    </MultiProvider>
  );
};

export default MultiProvider;
