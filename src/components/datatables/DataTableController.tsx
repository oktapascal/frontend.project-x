import { TableState } from "@tanstack/react-table";
import { Box, HStack, Text, Select, IconButton } from "@chakra-ui/react";

interface Props {
  getState: () => TableState;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setPageIndex: (index: number) => void;
}

export default function DataTableController({
  getPageCount,
  getState,
  getCanPreviousPage,
  getCanNextPage,
  nextPage,
  previousPage,
  setPageSize,
  setPageIndex,
}: Props) {
  return (
    <Box>
      <HStack spacing={3}>
        <Box>
          <Text as={"span"} fontSize="0.8rem" fontWeight="semibold">
            Rows Per Page :
          </Text>
        </Box>
        <Box>
          <Select size="xs" fontWeight="bold" onChange={(event) => setPageSize(Number(event.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Box>
        <Box>
          <Text as="span" fontSize="0.8rem" fontWeight="semibold">
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </Text>
        </Box>
        <Box>
          <IconButton
            aria-label="First Page"
            icon={<i className="ri-arrow-left-double-line icon-extra-small" />}
            size="xs"
            backgroundColor="transparent"
            isDisabled={!getCanPreviousPage()}
            onClick={() => setPageIndex(0)}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="Previous Page"
            icon={<i className="ri-arrow-drop-left-line icon-small" />}
            size="xs"
            backgroundColor="transparent"
            isDisabled={!getCanPreviousPage()}
            onClick={() => previousPage()}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="Next Page"
            icon={<i className="ri-arrow-drop-right-line icon-small" />}
            size="xs"
            backgroundColor="transparent"
            isDisabled={!getCanNextPage()}
            onClick={() => nextPage()}
          />
          {getCanNextPage()}
        </Box>
        <Box>
          <IconButton
            aria-label="Last Page"
            icon={<i className="ri-arrow-right-double-line icon-extra-small" />}
            size="xs"
            backgroundColor="transparent"
            isDisabled={!getCanNextPage()}
            onClick={() => setPageIndex(getPageCount() - 1)}
          />
        </Box>
      </HStack>
    </Box>
  );
}
