import React, { useMemo, useState } from "react";
import QRComponent from "./QRComponent";
import ListComponent from "./ListComponent";
import ScannerComponent from "./ScannerComponent";

function Home() {
  const [data, setData] = useState([]);

  const getQRCode = (result) => {
    
    setData((prevData) => [...prevData, result.data]);
  };

  const setClearList = () => {
    setData([]);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>QR Scanner</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 0.5, width: "100%", height: "100%" }}>
          <ScannerComponent
            getQRCode={getQRCode}
            data={data}
            setClearList={setClearList}
          />
        </div>
        <div
          style={{
            flex: 0.5,
            width: "100%",
            height: "700px",
            overflowY: "auto",
          }}
        >
          <ListComponent data={data} />
        </div>
      </div>
    </div>
  );
}

export default Home;
