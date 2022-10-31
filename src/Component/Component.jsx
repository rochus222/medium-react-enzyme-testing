import React, { useEffect, useState } from "react";
import ComponentTemplate from "./ComponentTemplate";
import { loadData } from "../api";

const Component = () => {
  const [data, setData] = useState([]);
  const refresh = async () => setData(await loadData());
  const clear = () => setData([]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ComponentTemplate
      title={`Items (${data.length})`}
      items={data}
      refresh={refresh}
      clear={clear}
    />
  );
};

export default Component;
