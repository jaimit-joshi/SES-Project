"use client"

import { SpeedDial, SpeedDialAction, styled } from "@mui/material"
import TuneIcon from "@mui/icons-material/Tune"
import React from "react"

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #4361ee;
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
    width: 60px;
    height: 60px;

    &:hover {
      background-color: #3a56d4;
      transform: scale(1.05);
    }
  }

  .MuiSpeedDialAction-fab {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    width: 48px;
    height: 48px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .MuiSpeedDialAction-staticTooltipLabel {
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    min-width: 160px;
    white-space: nowrap;
  }
`

const SpeedDialTemplate = ({ actions }) => {
  return (
    <CustomSpeedDial
      ariaLabel="SpeedDial menu"
      icon={<TuneIcon style={{ fontSize: "28px" }} />}
      direction="up"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        "& .MuiSpeedDial-actions": {
          paddingBottom: "16px",
          gap: "12px",
        },
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={React.cloneElement(action.icon, { style: { fontSize: "24px" } })}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={action.action}
          FabProps={{
            sx: {
              bgcolor: "white",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            },
          }}
        />
      ))}
    </CustomSpeedDial>
  )
}

export default SpeedDialTemplate

