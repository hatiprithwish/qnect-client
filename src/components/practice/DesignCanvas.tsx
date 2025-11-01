import { useCallback, useState, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus, Send } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CustomNode, type CustomNodeData } from "./CustomNode";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Initial nodes for the canvas
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: {
      name: "Client",
      notes: "Web or mobile client",
    },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 300, y: 300 },
    data: {
      name: "Server",
      notes: "Backend server",
    },
  },
  {
    id: "3",
    type: "customNode",
    position: { x: 500, y: 0 },
    data: {
      name: "Database",
      notes: "Choose databse and explain why you chose it",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

interface DesignCanvasProps {
  problemId?: string;
}

export function DesignCanvas({ problemId: _problemId }: DesignCanvasProps) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<CustomNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(4);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle name changes in nodes
  const handleNameChange = useCallback(
    (nodeId: string, newName: string) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, name: newName } }
            : node
        )
      );
    },
    [setNodes]
  );

  // Handle notes changes in nodes
  const handleNotesChange = useCallback(
    (nodeId: string, newNotes: string) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, notes: newNotes } }
            : node
        )
      );
    },
    [setNodes]
  );

  // Register custom node types
  const nodeTypes = useMemo(
    () =>
      ({
        customNode: CustomNode,
      } as NodeTypes),
    []
  );

  // Update all nodes with change handlers
  const nodesWithHandlers = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onNameChange: handleNameChange,
          onNotesChange: handleNotesChange,
        },
      })),
    [nodes, handleNameChange, handleNotesChange]
  );

  // Handle connection between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          { ...connection, markerEnd: { type: MarkerType.ArrowClosed } },
          eds
        )
      );
    },
    [setEdges]
  );

  // Add a new node to the canvas
  const addNewNode = useCallback(() => {
    const newNode: Node<CustomNodeData> = {
      id: nodeIdCounter.toString(),
      type: "customNode",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        name: `Component ${nodeIdCounter}`,
        notes: "",
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
    setNodeIdCounter((currentCounter) => currentCounter + 1);
  }, [nodeIdCounter, setNodes]);

  const handleSubmit = useCallback(() => {
    if (!isLoaded) return;

    // if (!user) {
    //   setShowAuthAlert(true);
    //   return;
    // }

    console.log("Submitting design:", { nodes, edges });
  }, [isLoaded, user, nodes, edges]);

  const handleSignIn = useCallback(() => {
    setShowAuthAlert(false);
    navigate(`/sign-in?redirect=${encodeURIComponent(location.pathname)}`);
  }, [navigate, location.pathname]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 relative">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={addNewNode}
          className="shadow-lg"
          size="default"
          aria-label="Add new node"
        >
          <Plus />
          Add Component
        </Button>
        <Button
          onClick={handleSubmit}
          className="shadow-lg"
          size="default"
          aria-label="Submit design"
        >
          <Send />
          Submit Design
        </Button>
      </div>

      {/* Auth Alert Dialog */}
      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to log in first to submit your design. Please sign in to
              continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignIn}
              className="dark:text-white cursor-pointer"
            >
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.1, maxZoom: 1 }}
        attributionPosition="bottom-right"
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        <Controls className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg" />
      </ReactFlow>
    </div>
  );
}
