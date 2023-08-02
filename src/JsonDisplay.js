import React from "react";
import { Button } from "react-bootstrap";

const JsonDisplay = ({ data, onClearData }) => {
  const displayData = (data, indent) => {
    if (typeof data === "object") {
      return (
        <ul style={{ listStyleType: "none", paddingLeft: indent }}>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? displayData(value, indent + 20) : value}
            </li>
          ))}
        </ul>
      );
    } else {
      return <span>{data}</span>;
    }
  };

  return (
    <div>
      {displayData(data, 20)}
      <Button variant="danger" onClick={onClearData}>Clear Data</Button>
    </div>
  )
};

export default JsonDisplay;