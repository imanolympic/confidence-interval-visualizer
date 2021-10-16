import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./IntervalTypeToggleButton.scss";

const IntervalTypeToggleButton = ({ type, setType }) => {
  return (
    <ToggleButtonGroup
      className="buttonGroup"
      color="primary"
      value={type}
      exclusive={true}
      onChange={(e, value) => {
        if (value !== null) {
          setType(value);
        }
      }}
    >
      <ToggleButton className="buttonGroupButton" value="proportions">
        Proportions
      </ToggleButton>
      <ToggleButton className="buttonGroupButton" value="means">
        Means
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default IntervalTypeToggleButton;
