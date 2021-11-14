import React from "react";

function UtilityRightButton({iconType,positionType = "absolute"}) {
  return (
    <div
      className="imageBackground flex flex-center"
      style={{ position: positionType, top: "15px", right: "15px", zIndex: 10 }}
    >
      <i
        className={iconType}
        style={{ color: "#f78383", fontSize: "18px" }}
      />
    </div>
  );
}

export default UtilityRightButton;
