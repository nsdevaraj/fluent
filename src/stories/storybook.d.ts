/**
 * Local ambient type shim for Storybook v10 (ESM-only) in a CRA/CJS TypeScript project.
 * Storybook's build pipeline uses its own TypeScript compilation; this shim satisfies
 * `tsc --noEmit` without requiring the ESM-only package to be resolved.
 */
declare module "@storybook/react" {
  import type { ComponentType, ReactNode } from "react";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Decorator<TArgs = any> = (
    Story: ComponentType,
    context: StoryContext<TArgs>
  ) => ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface StoryContext<TArgs = any> {
    globals?: Record<string, unknown>;
    args: TArgs;
    argTypes: Record<string, unknown>;
    parameters: Record<string, unknown>;
    [key: string]: unknown;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface Meta<TComponent extends ComponentType<any> = ComponentType<any>> {
    title?: string;
    component?: TComponent;
    tags?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    argTypes?: Record<string, any>;
    decorators?: Decorator[];
    parameters?: Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args?: any;
  }

  export type StoryObj<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends ComponentType<any> | Meta<ComponentType<any>> = ComponentType<any>
  > = {
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args?: T extends ComponentType<any>
      ? Partial<React.ComponentPropsWithoutRef<T>>
      : Record<string, unknown>;
    render?: (...args: unknown[]) => ReactNode;
    decorators?: Decorator[];
    parameters?: Record<string, unknown>;
  };

  export interface Preview {
    decorators?: Decorator[];
    parameters?: Record<string, unknown>;
    globals?: Record<string, unknown>;
  }
}
