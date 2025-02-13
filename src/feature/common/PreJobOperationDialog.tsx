import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import { cn } from "@src/lib/utils";
import { useEffect, useRef } from "react";

type PreJobOperationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  outputs: string[];
};

const PreJobOperationDialog = ({
  open,
  setOpen,
  outputs,
}: PreJobOperationDialogProps) => {
  const lastElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastElem.current && lastElem.current.scrollIntoView) {
      lastElem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [outputs.length]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Pre-run operation</DialogTitle>
          <DialogDescription>
            Installing required dependencies before running the flow chart...
          </DialogDescription>
        </DialogHeader>
        {outputs.map((output, i) => (
          <div
            key={`${output}-${i}`}
            ref={i === outputs.length - 1 ? lastElem : null}
            className={cn(
              "overflow-hidden whitespace-break-spaces bg-background px-2 font-mono",
              output.toLowerCase().includes("error")
                ? "text-red-700"
                : "text-muted-foreground",
            )}
          >
            {output}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default PreJobOperationDialog;
