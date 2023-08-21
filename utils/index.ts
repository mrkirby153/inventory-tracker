interface BooleanClasses {
  [key: string]: boolean | null | undefined;
}

type Classes = BooleanClasses | string;

export function classes(...args: Classes[]): string {
  return args
    .map((arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      return Object.entries(arg)
        .filter(([_, value]) => value)
        .map(([key, _]) => key)
        .join(" ");
    })
    .filter((v) => v)
    .join(" ");
}

export function conditionallyAddClass(
  conditional: boolean | null | undefined,
  ifTrue: string,
  ifFalse: string = "",
) {
  return conditional ? ifTrue : ifFalse;
}
