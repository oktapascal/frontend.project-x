import { Grid, GridItem } from "@chakra-ui/react";
import { CardModule } from "@/pages/main/components";
import { ListModulesProps } from "@/pages/main/components/ListModules/interface";

export default function ListModules({ modules }: ListModulesProps) {
  if (!modules) return <div>no data</div>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {modules.map((data) => {
        return (
          <GridItem key={data.module_id}>
            <CardModule label={data.name} icon={data.module_icon} module_id={data.module_id} default_view={data.default_view} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
