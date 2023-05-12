import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../assets/logo.webp";
import Signin from "./Signin";
import Regist from "./Regist";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState({
    login: false,
    regist: false,
  });

  const scrollDetect = () => {
    if (window.scrollY > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChangeLogin = (e) => {
    if (e.target.className === "header__login") {
      setShowForm({ login: true, regist: false });
      document.body.classList.add("_lock");
    } else if (e.target.className === "header__register") {
      setShowForm({ login: false, regist: true });
      document.body.classList.add("_lock");
    }
  };

  const handleCloseTab = () => {
    setShowForm({ login: false, regist: false });
    document.body.classList.remove("_lock");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollDetect);
    return () => window.removeEventListener("scroll", scrollDetect);
  }, []);

  return (
    <div className={`header ${show && "header__shown"}`}>
      <div className="header__container">
        <div className="header__wrap">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
            <h1>Movie Bee</h1>
          </div>
          <div className="header__auth">
            <button className="header__login" onClick={handleChangeLogin}>
              Log In
            </button>
            <button className="header__register" onClick={handleChangeLogin}>
              Join Us
            </button>
            {showForm.login && <Signin handleCloseTab={handleCloseTab} />}
            {}
            {showForm.regist && <Regist handleCloseTab={handleCloseTab} />}
          </div>
        </div>
      </div>
    </div>
  );
}
