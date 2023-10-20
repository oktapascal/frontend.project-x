import { FC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import CardModule from "./CardModule";

const ListModules: FC = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      <GridItem>
        <CardModule label="Test 1" />
      </GridItem>
      <GridItem>
        <CardModule label="Test 2" />
      </GridItem>
      <GridItem>
        <CardModule label="Test 3" />
      </GridItem>
      <GridItem>
        <CardModule label="Test 4" />
      </GridItem>
      <GridItem>
        <CardModule label="Test 5" />
      </GridItem>
      <GridItem>
        <CardModule label="Test 6" />
      </GridItem>
    </Grid>
  );
};

export default ListModules;
