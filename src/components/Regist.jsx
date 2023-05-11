import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Regist.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export default function Regist() {
  const [passwordShown, setPasswordShown] = useState(false);

  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
      .matches(/[^\w]/, getCharacterValidationError("symbol"))
      .required("Please enter a password"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      'Must match "password" field value'
    ),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="registr">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          axios
            .post(
              `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
              {
                email: values.email,
                password: values.password,
              }
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="registr__decor-bg">
              <div className="registr__decor">
                <span className="registr__decor-elem"></span>
                <h2 className="registr__title">Registration</h2>
                <fieldset>
                  <legend>Email</legend>
                  <Field name="email" type="email" />
                  {errors.email && touched.email ? (
                    <div className="registr__error">{errors.email}</div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <legend>Password</legend>
                  <div className="registr__input-wrapp">
                    <Field
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div className="registr__error">{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="registr__input-wrapp">
                    <Field
                      name="passwordConfirm"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Repeat Password"
                    />
                    {errors.passwordConfirm && touched.passwordConfirm ? (
                      <div className="registr__error">
                        {errors.passwordConfirm}
                      </div>
                    ) : null}
                  </div>
                  <div className="registr__checkbox-wrapper">
                    <label htmlFor="showPassword">Show Password</label>
                    <label htmlFor="showPassword">
                      {passwordShown ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </label>
                    <Field
                      name="showPassword"
                      id="showPassword"
                      type="checkbox"
                      checked={passwordShown}
                      onChange={(e) => {
                        setPasswordShown(e.target.checked);
                      }}
                    />
                  </div>
                </fieldset>

                <button type="submit">Submit</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
