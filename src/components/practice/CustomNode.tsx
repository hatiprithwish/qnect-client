import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface CustomNodeData extends Record<string, unknown> {
  name: string;
  notes: string;
  onNameChange?: (id: string, name: string) => void;
  onNotesChange?: (id: string, notes: string) => void;
}

type CustomNodeType = Node<CustomNodeData>;

export const CustomNode = memo(({ id, data }: NodeProps<CustomNodeType>) => {
  const typedData = data as CustomNodeData;

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      typedData.onNameChange?.(id, event.target.value);
    },
    [id, typedData]
  );

  const handleNotesChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      typedData.onNotesChange?.(id, event.target.value);
    },
    [id, typedData]
  );

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg min-w-[280px]">
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Node content */}
      <div className="p-4 space-y-3">
        {/* Name field */}
        <div>
          <label
            htmlFor={`node-${id}-name`}
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Name
          </label>
          <Input
            id={`node-${id}-name`}
            type="text"
            value={typedData.name}
            onChange={handleNameChange}
            placeholder="Component name"
            className="h-8"
          />
        </div>

        {/* Notes field */}
        <div>
          <label
            htmlFor={`node-${id}-notes`}
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Notes
          </label>
          <Textarea
            id={`node-${id}-notes`}
            value={typedData.notes}
            onChange={handleNotesChange}
            placeholder="Add notes..."
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
});

CustomNode.displayName = "CustomNode";
