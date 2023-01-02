import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";

const InputField = ({
  lable,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  const { inputFieldBox, inputFieldLable, inputField, errorMessageBox } = style;

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className={inputFieldBox}>
      <label className={inputFieldLable} htmlFor="inputField">
        {lable}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        className={inputField}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={errorMessageBox}>{error}</div>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  lable: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
};

InputField.defaultProps = {
  name: "name",
  lable: "Lable",
  placeholder: "Placeholder",
  type: "text",
  errorMessage: "",
};

export default InputField;
