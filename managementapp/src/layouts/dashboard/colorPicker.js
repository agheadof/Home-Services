import React from "react";
import {
  EditableInput,
  Hue,
  Saturation
} from "react-color/lib/components/common/";
import { CustomPicker } from "react-color";

const ColorPicker = ({ hsl, hsv, hex, onChange }) => {
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <div
        style={{
          height: "100px",
          width: "100px",
          position: "relative",
          float: "left",
          zIndex: 1000000
        }}
      >
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div
        style={{
          marginLeft: "10px",
          height: "100px",
          width: "10px",
          position: "relative",
          float: "left",
          zIndex: 1000000
        }}
      >
        <Hue hsl={hsl} direction="vertical" onChange={onChange} />
      </div>
      <div style={{ clear: "both" }}>
        <EditableInput value={hex} onChange={onChange} />
      </div>
    </div>
  );
};

export default CustomPicker(ColorPicker);
