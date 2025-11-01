export const queryKeys = {
  systemDesignProblems: {
    all: ["systemDesignProblems"] as const,
    list: () => [...queryKeys.systemDesignProblems.all, "list"] as const,
    detail: (systemDesignProblemId: string) =>
      [
        ...queryKeys.systemDesignProblems.all,
        "detail",
        systemDesignProblemId,
      ] as const,
  },
} as const;
