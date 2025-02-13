import {
  NodeElement,
  NodeSection,
  SubCategory,
} from "@src/utils/ManifestLoader";
import SidebarSection from "./SidebarSection";
import { LeafClickHandler } from "@feature/common/Sidebar/Sidebar";
import { sendEventToMix } from "@src/services/MixpanelServices";
import { NumpySvg, ScipySvg } from "@src/assets/ArithmeticSVG";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export const sidebarVariants = cva(undefined, {
  variants: {
    variant: {
      DATA: "text-accent2 bg-accent2/5 border-accent2",
      ETL: "text-accent1 bg-accent1/5 border-accent1",
      IO: "text-accent4 bg-accent4/5 border-accent4",
      LOGIC: "text-accent3 bg-accent3/5 border-accent3",
      AUTOGEN: "text-blue-500 bg-blue-500/5 border-blue-500",
    },
  },
});

export const categoryMap = {
  AI_ML: "DATA",
  GENERATORS: "DATA",
  VISUALIZERS: "DATA",
  LOADERS: "ETL",
  TRANSFORMERS: "ETL",
  INSTRUMENTS: "IO",
  LOGIC_GATES: "LOGIC",
  NUMPY: "AUTOGEN",
  SCIPY: "AUTOGEN",
  SKLEARN: "AUTOGEN",
};

const autogeneratedCategories = ["NUMPY", "SCIPY", "SKLEARN"];

const iconMap = {
  NUMPY: <NumpySvg className="h-8 w-8" />,
  SCIPY: <ScipySvg className="h-8 w-8" />,
};

type SidebarNodeProps = {
  depth: number;
  node: NodeSection | SubCategory;
  leafClickHandler: LeafClickHandler;
  query: string;
  matchedParent: boolean;
  expand: boolean;
  collapse: boolean;
  category?: string;
  autogeneratedCategory?: boolean;
  icon?: React.ReactNode;
};

const nodeTitleMatches = (query: string, node: NodeSection) =>
  Boolean(
    query !== "" &&
      node.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

const SidebarNode = ({
  depth,
  node,
  leafClickHandler,
  query,
  matchedParent = false,
  expand,
  collapse,
  category,
  autogeneratedCategory,
  icon,
}: SidebarNodeProps) => {
  if (node.name === "ROOT") {
    return (
      <div>
        {node.children.map((c) => {
          // Actually needs to be called as a function to achieve depth-first traversal,
          // otherwise React lazily evaluates it and doesn't recurse immediately, resulting in breadth-first traversal.
          return SidebarNode({
            node: c,
            depth: 0,
            leafClickHandler,
            query,
            matchedParent: nodeTitleMatches(query, c),
            expand,
            collapse,
            category: c.key,
            autogeneratedCategory: autogeneratedCategories.includes(c.key),
            icon: iconMap[c.key],
          });
        })}
      </div>
    );
  }
  const categoryHasNode = (node.children as unknown[])?.every(
    (n) => !n.children,
  );

  if (!categoryHasNode) {
    return (
      <SidebarSection
        title={node.name ?? ""}
        depth={depth + 1}
        expand={expand}
        collapse={collapse}
        key={node.name}
        category={category}
        autogeneratedCategory={autogeneratedCategory}
        icon={icon}
      >
        {node.children?.map((c) =>
          SidebarNode({
            node: c,
            depth: depth + 1,
            leafClickHandler,
            query,
            matchedParent: matchedParent || nodeTitleMatches(query, c),
            expand,
            collapse,
            category,
            autogeneratedCategory,
            icon,
          }),
        )}
      </SidebarSection>
    );
  }

  const commands = (node.children as unknown[])?.filter((c) => !c.children);
  const lowercased = query.toLocaleLowerCase();
  const shouldFilter = query !== "" && !matchedParent;
  const searchMatches = shouldFilter
    ? commands?.filter(
        (c) =>
          c.key?.toLocaleLowerCase().includes(lowercased) ||
          c.name?.toLocaleLowerCase().includes(lowercased),
      )
    : commands;

  if (searchMatches?.length === 0) {
    return null;
  }
  return (
    <div key={node.name}>
      <SidebarSection
        title={node.name ?? ""}
        depth={depth + 1}
        expand={expand}
        collapse={collapse}
        key={node.name}
        category={category}
        autogeneratedCategory={autogeneratedCategory}
        icon={icon}
      >
        {searchMatches?.map((command) => (
          <button
            key={command.key}
            className={twMerge(
              "mb-1.5 flex max-h-10 w-11/12 items-center justify-between rounded-sm border px-2 py-2.5 font-mono",
              sidebarVariants({
                variant: categoryMap[category ?? "TRANSFORMERS"] ?? "ETL",
              }),
            )}
            onClick={() => {
              if (query !== "") {
                sendEventToMix(
                  "Node Searched",
                  command.name ?? "",
                  "nodeTitle",
                );
              }
              leafClickHandler(command as unknown as NodeElement);
            }}
          >
            {command.key ?? command.name}
            {icon}
          </button>
        ))}
      </SidebarSection>
    </div>
  );
};

export default SidebarNode;
