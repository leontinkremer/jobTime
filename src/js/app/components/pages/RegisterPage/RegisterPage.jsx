// built-in modules
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// custom modules
import { validator } from "../../../utils/validator";

// styles
import style from "./_layout.module.scss";

// custom hooks
import { useAuth } from "../../../hooks/useAuth";

// components
import Section from "../../common/Section";
import Container from "../../common/Container";
import Row from "../../common/Row";
import InputField from "../../common/InputField";
import Button from "../../common/Button";

const RegisterPage = () => {
  const {
    column,
    loginFormContainer,
    loginFormHeader,
    formHeaderText,
    loginForm,
    inputField,
    loginFormButtonsSection,
    loginFormFooter,
    submitButton,
    loginFormLink,
  } = style;

  const history = useHistory();
  const { signUp } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Bitte gib Deine E-Mail-Adresse ein.",
      },
      isEmail: {
        message: "Deine E-Mail ist nicht korrekt.",
      },
    },

    password: {
      isRequired: {
        message: "Bitte gib ein Passwort ein.",
      },
      isCapitalSymbol: {
        message: "Das Passwort soll mindestens einen Großbuchstaben enthalten.",
      },
      isContainDigit: {
        message: "Das Passwort soll mindestens eine Ziffer enthalten.",
      },
      min: {
        message: "Das Passwort darf nicht kürzer wie 8 Zeichen sein.",
        value: 8,
      },
    },
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      await signUp(data);
      history.push("/login");
    } catch (error) {
      setErrors(error);
      console.log(error);
    }
  };

  return (
    <Section>
      <Container>
        <Row maxWidth="600px">
          <div className={column}>
            <div className={loginFormContainer}>
              <div className={loginFormHeader}>
                <p className={formHeaderText}>Registrieren</p>
              </div>
              <form className={loginForm} onSubmit={handleSubmit}>
                <InputField
                  name="email"
                  lable="E-Mail"
                  value={data.email}
                  placeholder="E-Mail"
                  error={errors.email}
                  onChange={handleChange}
                />
                <InputField
                  name="password"
                  lable="Passwort"
                  placeholder="Passwort"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                <div className={loginFormButtonsSection}>
                  <Button
                    type="submit"
                    mobileFullWidth="true"
                    disabled={!isValid}
                    handleClick={handleSubmit}
                  >
                    Registrieren
                  </Button>
                </div>
              </form>
              <div className={loginFormFooter}>
                <Link to="/login">
                  <li className={loginFormLink}>
                    Bereits registriert? Einloggen
                  </li>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </Section>
  );
};

export default RegisterPage;
