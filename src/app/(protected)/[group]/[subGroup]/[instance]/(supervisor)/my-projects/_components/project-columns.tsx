import { Project, Stage } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { stageGt, stageGte } from "@/lib/utils/permissions/stage-check";
import { getSelectColumn } from "@/components/ui/data-table/select-column";

type SupervisorProjectsData = Pick<
  Project,
  | "id"
  | "title"
  | "capacityLowerBound"
  | "capacityUpperBound"
  | "preAllocatedStudentId"
>;

export function columns(
  stage: Stage,
  removeRow: (id: string) => void,
  clearTable: () => void,
): ColumnDef<SupervisorProjectsData>[] {
  const selectCol = getSelectColumn<SupervisorProjectsData>();

  const userCols: ColumnDef<SupervisorProjectsData>[] = [
    {
      id: "id",
      accessorFn: ({ id }) => id,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="w-16"
          column={column}
          title="ID"
          canFilter
        />
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="cursor-default">
                  <div className="w-16 truncate">{id}</div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ),
    },
    {
      id: "title",
      accessorFn: ({ title }) => title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({
        row: {
          original: { id, title },
        },
      }) => (
        <Link href={`projects/${id}`}>
          <Button variant="link">{title}</Button>
        </Link>
      ),
    },
    {
      id: "Pre-Allocated StudentId",
      accessorFn: ({ preAllocatedStudentId }) => preAllocatedStudentId,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pre-allocated Student" />
      ),
    },
    {
      id: "Capacity Upper Bound",
      accessorFn: ({ capacityUpperBound }) => capacityUpperBound,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="w-12"
          column={column}
          title="Upper Bound"
        />
      ),
      cell: ({
        row: {
          original: { capacityUpperBound },
        },
      }) => <div className="w-12 text-center">{capacityUpperBound}</div>,
    },
    {
      accessorKey: "actions",
      id: "Actions",
      header: ({ table }) => {
        const allSelected = table.getIsAllRowsSelected();

        if (stageGte(stage, Stage.PROJECT_ALLOCATION)) return;
        if (allSelected)
          return (
            <Button variant="ghost" size="icon" onClick={clearTable}>
              <X className="h-5 w-5" />
            </Button>
          );

        return <div className="w-fit" />;
      },
      cell: ({
        row: {
          original: { id },
        },
      }) => {
        if (stageGte(stage, Stage.PROJECT_ALLOCATION)) return;
        return (
          <Button variant="ghost" size="icon" onClick={() => removeRow(id)}>
            <X className="h-5 w-5" />
          </Button>
        );
      },
    },
  ];

  if (stageGt(stage, Stage.PROJECT_SUBMISSION)) return userCols;
  return [selectCol, ...userCols];
}
