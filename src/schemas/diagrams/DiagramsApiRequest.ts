import { z } from "zod";

// Interface for individual nodes
export interface DiagramNode {
  id: string;
  name: string;
  notes?: string;
  nodeType?: string;
}

// Interface for individual edges
export interface DiagramEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}

export const ZDiagramNode = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  notes: z.string().optional(),
  nodeType: z.string().optional(),
});

export const ZDiagramEdge = z.object({
  id: z.string().min(1),
  sourceNodeId: z.string().min(1),
  targetNodeId: z.string().min(1),
});

export const ZCreateDiagramApiRequest = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  systemDesignProblemId: z.string().min(1),
  version: z.number().int().positive(),
  nodes: z.array(ZDiagramNode).min(1),
  edges: z.array(ZDiagramEdge),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateDiagramApiRequest = z.infer<
  typeof ZCreateDiagramApiRequest
> & {
  userPublicId: string;
};
