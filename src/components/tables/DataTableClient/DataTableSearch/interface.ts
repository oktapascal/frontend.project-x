export interface DataTableSearchProps {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}
