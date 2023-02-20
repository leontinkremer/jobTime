// built-in modules
import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

// components
import Button from "../Button";

// custom modules
import { NavbarConfig } from "./NavbarConfig";

// styles
import style from "./_layout.module.scss";
import { useSelector } from "react-redux";
import { getCurrentUserId, getIsLoggedIn } from "../../../store/users";
import { PATH_CLIPBOARD } from "../../../utils/paths";

const Navbar = ({ isLoggedIn }) => {
  const { nav, navInput, navCheckButton, navLogo, navList, navListItem } =
    style;
  const [isNavOpened, setNavOpened] = useState(false);
  const [showProtectedItems, setShowProtectedItems] = useState(false);

  useEffect(() => {
    isLoggedIn ? setShowProtectedItems(true) : setShowProtectedItems(false);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   console.log("isLoggedIn:", isLoggedIn);
  // });

  const handleCloseMobileNavbar = () => {
    setNavOpened(false);
    console.log("isNavOpened", isNavOpened);
  };

  const toggleMobileNavbar = () => {
    setNavOpened((prevState) => !prevState);
  };

  return (
    <>
      <nav className={nav} id="nav">
        <input
          className={navInput}
          type="checkbox"
          id="check"
          checked={isNavOpened}
          onChange={() => toggleMobileNavbar()}
        />

        <label htmlFor="check" className={navCheckButton}>
          <i className="fas fa-bars"></i>
        </label>
        <Link onClick={() => handleCloseMobileNavbar()} to="/">
          <label className={navLogo}>smartClipboard</label>
        </Link>

        <ul className={navList}>
          {isLoggedIn ? (
            NavbarConfig.map(({ id, name, path }) => (
              <Link
                onClick={() => handleCloseMobileNavbar()}
                key={id}
                to={path}
              >
                <li className={navListItem}>{name}</li>
              </Link>
            ))
          ) : (
            <>
              <Link onClick={() => handleCloseMobileNavbar()} to="/#nav">
                <li className={navListItem}>Home</li>
              </Link>
              <Link onClick={() => handleCloseMobileNavbar()} to="/#features">
                <li className={navListItem}>Features</li>
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <Link onClick={() => handleCloseMobileNavbar()} to="/logout">
              <Button actionType="secondary" marginRight="true">
                Abmelden
              </Button>
            </Link>
          ) : (
            <Link
              onClick={() => {
                handleCloseMobileNavbar();
              }}
              to="/login"
            >
              <Button actionType="primary" marginRight="true">
                Anmelden
              </Button>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
