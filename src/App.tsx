import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import TableScrollBoradComponent from "./components/TableScrollBoard/TableScrollBoradComponent";
import TableScrollBoradConfigComponent from "./components/TableScrollBoard/TableScrollBoradConfigComponent";
import { initColumn, tableConfig, tableData } from "./components/TableScrollBoard/config";

function App() {
  const [configState, setConfigState] = useState(() => {
    const keys = Object.keys(tableConfig.dataset[0]);
    keys.forEach((key) => {
      tableConfig.columnConfig.columns.push(initColumn(key, key));
    });
    return tableConfig;
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center gap-20 bg-dark">
        <div className="border-1 border-dark-100 border-solid" style={{ width: "600px", height: "400px" }}>
          <TableScrollBoradComponent data={tableData} config={configState} />
        </div>
        <div className="w-100 h-100 overflow-y-scroll overflow-x-hidden border-1 border-dark-100 border-solid p-2">
          <TableScrollBoradConfigComponent data={tableData} config={configState} updateConfig={setConfigState} />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
