import React, { useContext } from "react";
import ColorPicker from "./colorPicker";
import { Game } from "./GameContext";

const Pickers = (colors) => {
  return (
    <div style={{ display: "flex" }}>
      {colors.map((color, index) => (
        <div key={color} style={{ flex: 1 }}>
          <ColorPicker
            color={colors[index]}
            onChange={({ hex }) => updateColor(color, hex)}
          />
        </div>
      ))}
    </div>
  );
};

export default Pickers;
