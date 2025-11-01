export interface SystemDesignProblemBase {
  publicId: string;
  title: string;
  description: string;
}

export interface SystemDesignProblem extends SystemDesignProblemBase {
  referenceSnippets: JSON;
  requiredNodes: string[];
  nodesRequiringAnnotations: string[];
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  metadata: JSON;
  difficulty: string;
  isPremium: boolean;
}
