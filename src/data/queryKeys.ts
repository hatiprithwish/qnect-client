export const queryKeys = {
  problems: {
    all: ["problems"] as const,
    list: () => [...queryKeys.problems.all, "list"] as const,
    detail: (problemId: string) =>
      [...queryKeys.problems.all, "detail", problemId] as const,
  },
} as const;
