export interface ProblemBase {
  publicId: string;
  title: string;
  description: string;
}

export interface Problem extends ProblemBase {
  referenceSnippets: JSON;
  requiredNodes: string[];
  nodesRequiringAnnotations: string[];
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  metadata: JSON;
  difficulty: string;
  isPremium: boolean;
}
