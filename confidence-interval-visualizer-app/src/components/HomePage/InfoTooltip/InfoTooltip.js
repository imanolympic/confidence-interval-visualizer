import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@material-ui/core/styles";

const InfoTooltip = ({ text }) => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: " rgba(65, 71, 112, 0.85)",
      boxShadow: theme.shadows[1],
      fontSize: 14,
      fontFamily: "AirbnbCereal",
    },
  }));

  return (
    <div>
      <LightTooltip title={text}>
        <IconButton>
          <InfoIcon sx={{ color: "rgb(220, 207, 236, 1)" }} />
        </IconButton>
      </LightTooltip>
    </div>
  );
};

export default InfoTooltip;
