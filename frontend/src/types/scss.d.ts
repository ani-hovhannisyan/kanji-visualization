declare module "*.scss" {
  const exports: {
    [exportName: string]: string;
  };
  export = exports;
}
