type TClassName = string | number | boolean | null | undefined;

export const classNames = (...args: TClassName[]) => {
  return args.filter(Boolean).join(" ");
};
