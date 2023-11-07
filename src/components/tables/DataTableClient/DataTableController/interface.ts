import { TableState } from "@tanstack/react-table";

export interface DataTableControllerProps {
  getState: () => TableState;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setPageIndex: (index: number) => void;
}
