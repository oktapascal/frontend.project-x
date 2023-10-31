import { useState, useEffect } from "react";
import { Box, Input } from "@chakra-ui/react";

interface Props {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

export default function DataTableSearch({ value: initialValue, debounce = 500, onChange }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Box>
      <Input type="text" placeholder="Search Data..." size="sm" htmlSize={30} width="auto" onChange={(event) => setValue(event.target.value)} />
    </Box>
  );
}
