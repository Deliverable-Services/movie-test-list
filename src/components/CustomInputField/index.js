import React from "react";
import { useFormContext } from "react-hook-form";
import { CustomInputContainer } from "./style";

const CustomInputField = ({
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  customClass = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <CustomInputContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={customClass}
        {...register(name, { required })}
      />
      {errors[name] && (
        <p className="error-message">
          {errors[name].message || "This field is required"}
        </p>
      )}
    </CustomInputContainer>
  );
};

export default CustomInputField;
