import { FC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ModuleResponses } from "../types";
import CardModule from "./CardModule";

interface Props {
  modules?: ModuleResponses[];
}

const ListModules: FC<Props> = ({ modules }) => {
  if (!modules) return <div>no data</div>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {modules.map((data) => {
        return (
          <GridItem key={data.module_id}>
            <CardModule label={data.name} icon={data.module_icon} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ListModules;
