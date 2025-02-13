import { MenubarItem } from "@/components/ui/menubar";
import { useFlowChartGraph } from "@src/hooks/useFlowChartGraph";
import { useSocket } from "@src/hooks/useSocket";
import { useFilePicker } from "use-file-picker";

export const LoadButton = () => {
  const { loadFlowExportObject } = useFlowChartGraph();
  const {
    states: { setProgramResults },
  } = useSocket();

  const [openFileSelector] = useFilePicker({
    readAs: "Text",
    accept: [".json"],
    maxFileSize: 50,
    onFilesRejected: ({ errors }) => {
      console.error("Errors when trying to load file: ", errors);
    },
    onFilesSuccessfulySelected: ({ filesContent }) => {
      // Just pick the first file that was selected
      const parsedFileContent = JSON.parse(filesContent[0].content);
      const flow = parsedFileContent.rfInstance;
      loadFlowExportObject(flow);
      setProgramResults([]);
    },
  });

  return (
    <MenubarItem onClick={openFileSelector} id="load-app-btn">
      Load
    </MenubarItem>
  );
};
