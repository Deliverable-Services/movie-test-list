import React from "react";
import { ButtonContainer } from "./style";

const CustomButton = ({
  title,
  type = "button",
  onClick,
  disabled = false,
  customClass = "",
}) => {
  return (
    <ButtonContainer
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={customClass}
      style={{ cursor: "pointer" }}
    >
      {title}
    </ButtonContainer>
  );
};

export default CustomButton;
