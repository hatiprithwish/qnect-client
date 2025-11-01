export interface CategoryScore {
  score: number; // 0..100
  rationale: string;
}

export interface DiagramAIFeedback {
  summary: string;
  categoryScores: CategoryScore;
  missingDetails: [
    { nodeId?: string; field: string; whyItMatters: string; example: string }
  ];
  risks: [{ title: string; description: string; mitigation: string }];
  followUpQuestions: [
    { to: "global" | "node"; nodeId?: string; question: string; reason: string }
  ];
  improvementActions: [{ title: string; steps: [string] }];
  llDPrompts: [{ title: string; prompt: string; expectedArtifacts: [string] }];
}
