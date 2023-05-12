import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  faEye,
  faEyeSlash,
  faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export default function Signin({ handleCloseTab }) {
  const [passwordShown, setPasswordShown] = useState(false);
  return (
    <div className="auth">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          axios
            .post(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
              {
                email: values.email,
                password: values.password,
              }
            )
            .then(function (response) {
              handleCloseTab();
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="auth__decor-bg">
              <div className="auth__decor">
                <span className="auth__decor-elem"></span>
                <span
                  type="button"
                  className="auth__close"
                  onClick={() => handleCloseTab()}
                >
                  <FontAwesomeIcon icon={faRectangleXmark} />
                </span>
                <h2 className="auth__title">Log In</h2>
                <fieldset>
                  <legend>Email</legend>
                  <Field name="email" type="email" placeholder="Email" />
                </fieldset>
                <fieldset>
                  <legend>Password</legend>
                  <div className="auth__input-wrapp">
                    <Field
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                    />
                  </div>
                  <div className="auth__checkbox-wrapper">
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

                <button type="submit">Log In</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
