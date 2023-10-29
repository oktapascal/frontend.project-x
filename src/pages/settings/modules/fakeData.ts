interface IData {
  module_id: string;
  module_name: string;
}

const prefix = "MDL.";
const data: IData[] = [];

let no = 1;

for (let i = 0; i <= 300; i++) {
  data.push({
    module_id: `${prefix}${no}`,
    module_name: `Module ${no}`,
  });

  no++;
}

export default data;
