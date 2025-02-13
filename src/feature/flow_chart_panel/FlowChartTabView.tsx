import { useFlowChartState } from "@hooks/useFlowChartState";
import PYTHON_FUNCTIONS from "@src/data/pythonFunctions.json";
import { useFlowChartGraph } from "@src/hooks/useFlowChartGraph";
// import useKeyboardShortcut from "@src/hooks/useKeyboardShortcut";
import { useSocket } from "@src/hooks/useSocket";
import { nodeSection } from "@src/utils/ManifestLoader";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import localforage from "localforage";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ConnectionLineType,
  EdgeTypes,
  MiniMap,
  NodeDragHandler,
  OnConnect,
  OnEdgesChange,
  OnInit,
  OnNodesChange,
  OnNodesDelete,
  ReactFlow,
  ReactFlowProvider,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import Sidebar, { LeafClickHandler } from "../common/Sidebar/Sidebar";
import FlowChartKeyboardShortcuts from "./FlowChartKeyboardShortcuts";
import { useFlowChartTabState } from "./FlowChartTabState";
import { useAddNewNode } from "./hooks/useAddNewNode";
import { NodeExpandMenu } from "./views/NodeExpandMenu";
import { sendEventToMix } from "@src/services/MixpanelServices";
import { ACTIONS_HEIGHT, LAYOUT_TOP_HEIGHT, Layout } from "../common/Layout";
import { getEdgeTypes, isCompatibleType } from "@src/utils/TypeCheck";
import { CenterObserver } from "./components/CenterObserver";
// import { CommandMenu } from "../command/CommandMenu";
import useNodeTypes from "./hooks/useNodeTypes";
import { Separator } from "@src/components/ui/separator";
import { Pencil, Workflow, X } from "lucide-react";
import { GalleryModal } from "@src/components/gallery/GalleryModal";
import { toast, Toaster } from "sonner";
import { useTheme } from "@src/providers/theme-provider";
import { ClearCanvasBtn } from "./components/ClearCanvasBtn";
import { Button } from "@src/components/ui/button";
import { ResizeFitter } from "./components/ResizeFitter";
import NodeEditModal from "./components/node-edit-menu/NodeEditModal";

localforage.config({
  name: "react-flow",
  storeName: "flows",
});

const FlowChartTab = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [nodeModalOpen, setNodeModalOpen] = useState(false);

  const { theme, resolvedTheme } = useTheme();

  const {
    isSidebarOpen,
    setIsSidebarOpen,
    setRfInstance,
    isEditMode,
    setIsEditMode,
  } = useFlowChartState();

  const {
    states: { programResults },
  } = useSocket();

  const { pythonString, setPythonString, nodeFilePath, setNodeFilePath } =
    useFlowChartTabState();

  const { nodes, setNodes, edges, setEdges, selectedNode, unSelectedNodes } =
    useFlowChartGraph();

  const getNodeFuncCount = useCallback(
    (func: string) => {
      return nodes.filter((n) => n.data.func === func).length;
    },
    // including nodes variable in dependency list would cause excessive re-renders
    // as nodes variable is updated so frequently
    // using nodes.length is more efficient for this case
    // adding eslint-disable-next-line react-hooks/exhaustive-deps to suppress eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes.length],
  );

  const addNewNode = useAddNewNode(setNodes, getNodeFuncCount);

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [setIsSidebarOpen],
  );

  const handleNodeRemove = useCallback(
    (nodeId: string, nodeLabel: string) => {
      setNodes((prev) => prev.filter((node) => node.id !== nodeId));
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      );
      sendEventToMix("Node Deleted", nodeLabel, "nodeTitle");
    },
    [setNodes, setEdges],
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({ default: SmartBezierEdge }),
    [],
  );

  const nodeTypes = useNodeTypes({
    handleRemove: handleNodeRemove,
    wrapperOnClick: () => {
      setIsEditMode(true);
    },
  });

  const onInit: OnInit = (rfIns) => {
    rfIns.fitView({
      padding: 0.8,
    });
    setRfInstance(rfIns.toObject());
  };
  const handleNodeDrag: NodeDragHandler = (_, node) => {
    setNodes((nodes) => {
      const nodeIndex = nodes.findIndex((el) => el.id === node.id);
      nodes[nodeIndex] = node;
    });
  };
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((ns) => applyNodeChanges(changes, ns));
    },
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        const [sourceType, targetType] = getEdgeTypes(connection);
        if (isCompatibleType(sourceType, targetType)) {
          return addEdge(connection, eds);
        }

        toast.message("Type error", {
          description: `Type error: Source type ${sourceType} and target type ${targetType} are not compatible`,
        });
      }),
    [setEdges],
  );
  const handleNodesDelete: OnNodesDelete = useCallback(
    (nodes) => {
      nodes.forEach((node) => {
        sendEventToMix("Node Deleted", node.data.label, "nodeTitle");
      });
      const selectedNodeIds = nodes.map((node) => node.id);
      setNodes((prev) =>
        prev.filter((node) => !selectedNodeIds.includes(node.id)),
      );
    },
    [setNodes],
  );

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (selectedNode === null) {
      return;
    }
    const nodeFileName = `${selectedNode?.data.func}.py`;
    const nodeFileData = PYTHON_FUNCTIONS[nodeFileName] ?? {};
    setNodeFilePath(nodeFileData.path ?? "");
    setPythonString(nodeFileData.metadata ?? "");
  }, [selectedNode, setNodeFilePath, setPythonString]);

  const proOptions = { hideAttribution: true };

  // const selectAllNodesShortcut = () => {
  //   setNodes((nodes) => {
  //     nodes.forEach((node) => {
  //       node.selected = true;
  //     });
  //   });
  // };
  //
  // const deselectAllNodeShortcut = () => {
  //   setNodes((nodes) => {
  //     nodes.forEach((node) => {
  //       node.selected = false;
  //     });
  //   });
  // };
  //
  // const deselectNodeShortcut = () => {
  //   setNodes((nodes) => {
  //     nodes.forEach((node) => {
  //       if (selectedNode !== null && node.id === selectedNode.id) {
  //         node.selected = false;
  //       }
  //     });
  //   });
  // };

  // useKeyboardShortcut("ctrl", "0", () => deselectAllNodeShortcut());
  // useKeyboardShortcut("ctrl", "9", () => deselectNodeShortcut());
  //
  // useKeyboardShortcut("meta", "0", () => deselectAllNodeShortcut());
  // useKeyboardShortcut("meta", "9", () => deselectNodeShortcut());

  const nodeToEdit =
    nodes.filter((n) => n.selected).length > 1 ? null : selectedNode;

  return (
    <Layout>
      <ReactFlowProvider>
        <div className="mx-8" style={{ height: ACTIONS_HEIGHT }}>
          <div className="py-1" />
          <div className="flex">
            <Button
              data-testid="add-node-button"
              className="gap-2"
              variant="ghost"
              onClick={toggleSidebar}
            >
              <Workflow size={20} className="stroke-muted-foreground" />
              Add Node
            </Button>

            <GalleryModal
              isGalleryOpen={isGalleryOpen}
              setIsGalleryOpen={setIsGalleryOpen}
            />
            <div className="grow" />
            {selectedNode && (
              <>
                {!isEditMode ? (
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setIsEditMode(true)}
                  >
                    <Pencil size={18} className="stroke-muted-foreground" />
                    Edit Node
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setIsEditMode(false)}
                  >
                    <X size={18} className="stroke-muted-foreground" />
                    Cancel Edit
                  </Button>
                )}
              </>
            )}
            <ClearCanvasBtn clearCanvas={clearCanvas} />
          </div>
          <div className="py-1" />
          <Separator />
        </div>

        <Sidebar
          sections={nodeSection}
          leafNodeClickHandler={addNewNode as LeafClickHandler}
          isSideBarOpen={isSidebarOpen}
          setSideBarStatus={setIsSidebarOpen}
        />

        <Toaster theme={theme} />

        <div
          style={{ height: `calc(100vh - ${LAYOUT_TOP_HEIGHT}px)` }}
          className="relative overflow-hidden"
          data-testid="react-flow"
          id="flow-chart-area"
        >
          {nodeToEdit && isEditMode && (
            <NodeEditModal
              node={nodeToEdit}
              otherNodes={unSelectedNodes}
              setNodeModalOpen={setNodeModalOpen}
              handleDelete={handleNodeRemove}
            />
          )}

          <FlowChartKeyboardShortcuts />
          <ResizeFitter />
          <CenterObserver />

          <ReactFlow
            id="flow-chart"
            style={{
              position: "fixed",
              height: "100%",
              width: "50%",
              textAlign: "center",
            }}
            proOptions={proOptions}
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            edgeTypes={edgeTypes}
            connectionLineType={ConnectionLineType.Step}
            onInit={onInit}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={handleNodeDrag}
            onNodesDelete={handleNodesDelete}
            fitViewOptions={{
              padding: 0.8,
            }}
          >
            <MiniMap
              style={{
                backgroundColor:
                  resolvedTheme === "light"
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(255, 255, 255, 0.1)",
              }}
              nodeColor={
                resolvedTheme === "light"
                  ? "rgba(0, 0, 0, 0.25)"
                  : "rgba(255, 255, 255, 0.25)"
              }
              maskColor={
                resolvedTheme === "light"
                  ? "rgba(0, 0, 0, 0.05)"
                  : "rgba(255, 255, 255, 0.05)"
              }
              zoomable
              pannable
            />
            <Controls fitViewOptions={{ padding: 0.8 }} />
          </ReactFlow>

          <NodeExpandMenu
            selectedNode={selectedNode}
            modalIsOpen={nodeModalOpen}
            setModalOpen={setNodeModalOpen}
            nodeResults={programResults}
            pythonString={pythonString}
            nodeFilePath={nodeFilePath}
          />
        </div>
      </ReactFlowProvider>
      {/* <CommandMenu /> */}
    </Layout>
  );
};

export default FlowChartTab;
