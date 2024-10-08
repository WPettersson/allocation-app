"use client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal as MoreIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionColumnLabel } from "@/components/ui/data-table/action-column-label";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { getSelectColumn } from "@/components/ui/data-table/select-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WithTooltip } from "@/components/ui/tooltip-wrapper";
import {
  YesNoActionContainer,
  YesNoActionTrigger,
} from "@/components/yes-no-action";

import { NewStudent } from "@/lib/validations/add-users/new-user";

export function constructColumns({
  removeStudent,
  removeSelectedStudents,
}: {
  removeStudent: (id: string) => Promise<void>;
  removeSelectedStudents: (ids: string[]) => Promise<void>;
}): ColumnDef<NewStudent>[] {
  const selectCol = getSelectColumn<NewStudent>();

  const userCols: ColumnDef<NewStudent>[] = [
    {
      id: "Full Name",
      accessorFn: ({ fullName }) => fullName,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Full Name" />
      ),
      cell: ({
        row: {
          original: { fullName },
        },
      }) => (
        <WithTooltip
          align="start"
          tip={<div className="max-w-xs">{fullName}</div>}
        >
          <div className="w-40 truncate">{fullName}</div>
        </WithTooltip>
      ),
    },
    {
      id: "GUID",
      accessorFn: ({ institutionId: guid }) => guid,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GUID" canFilter />
      ),
      cell: ({
        row: {
          original: { institutionId: guid },
        },
      }) => (
        <WithTooltip align="start" tip={<div className="max-w-xs">{guid}</div>}>
          <div className="w-32 truncate">{guid}</div>
        </WithTooltip>
      ),
    },
    {
      id: "Email",
      accessorFn: ({ email }) => email,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      id: "Student Level",
      accessorFn: ({ level }) => level,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Level" />
      ),
      cell: ({
        row: {
          original: { level },
        },
      }) => <div className="text-center">{level}</div>,
    },
    {
      accessorKey: "actions",
      id: "Actions",
      header: ({ table }) => {
        const someSelected =
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected();

        const selectedStudentIds = table
          .getSelectedRowModel()
          .rows.map((e) => e.original.institutionId);

        function handleRemoveSelectedStudents() {
          void removeSelectedStudents(selectedStudentIds).then(() =>
            table.toggleAllRowsSelected(false),
          );
        }

        if (someSelected)
          return (
            <div className="flex w-14 items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <span className="sr-only">Open menu</span>
                    <MoreIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <YesNoActionContainer
                  action={handleRemoveSelectedStudents}
                  title="Remove Students?"
                  description={
                    selectedStudentIds.length === 1
                      ? `You are about to remove 1 student from the list. Do you wish to proceed?`
                      : `You are about to remove ${selectedStudentIds.length} students from the list. Do you wish to proceed?`
                  }
                >
                  <DropdownMenuContent align="center" side="bottom">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-red-100/40 focus:text-destructive">
                      <YesNoActionTrigger
                        trigger={
                          <button className="m-0 flex items-center gap-2 p-1.5 text-sm">
                            <Trash2Icon className="h-4 w-4" />
                            <span>Remove selected Students</span>
                          </button>
                        }
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </YesNoActionContainer>
              </DropdownMenu>
            </div>
          );

        return <ActionColumnLabel />;
      },
      cell: ({
        row: {
          original: { fullName, institutionId },
        },
      }) => (
        <div className="flex w-14 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <YesNoActionContainer
              action={() => void removeStudent(institutionId)}
              title="Remove Student?"
              description={`You are about to remove "${fullName}" from the student list. Do you wish to proceed?`}
            >
              <DropdownMenuContent align="center" side="bottom">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="bg-background text-destructive focus:bg-red-100/40 focus:text-destructive">
                  <YesNoActionTrigger
                    trigger={
                      <button className="m-0 flex items-center gap-2 p-1.5 text-sm">
                        <Trash2Icon className="h-4 w-4" />
                        <span>Remove Student {fullName}</span>
                      </button>
                    }
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </YesNoActionContainer>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return [selectCol, ...userCols];
}
