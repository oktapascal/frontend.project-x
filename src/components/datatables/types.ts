import { ReactNode } from "react";
import { TableState } from "@tanstack/react-table";

export interface DataTableProps {
  tablehead: ReactNode;
  tablebody: ReactNode;
}

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

export interface DataTableRowLoadingProps {
  colSpan: number;
}

export interface DataTableRowNotFoundProps extends DataTableRowLoadingProps {}

export interface DataTableSearchProps {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}
