// built-in modules
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

// components
import Button from "../Button";

// custom modules
import { NavbarConfig } from "./NavbarConfig";
import { clearLocalStorage } from "../../../services/localStorage.service";

// custom hooks
import { useAuth } from "../../../hooks/useAuth";

// styles
import style from "./_layout.module.scss";

const Navbar = () => {
  const {
    nav,
    navInput,
    navCheckButton,
    navLogo,
    navList,
    navListItem,
    navLink,
    navLinkActive,
  } = style;

  const history = useHistory();
  const { isLoading, currentUser, logOut } = useAuth();
  const [isNavOpened, setNavOpened] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleCloseMobileNavbar = () => {
    setNavOpened(false);
    console.log("isNavOpened", isNavOpened);
  };

  const toggleMobileNavbar = () => {
    setNavOpened((prevState) => !prevState);
  };

  useEffect(() => {
    console.log("isNavOpened", isNavOpened);
  }, [isNavOpened]);

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
          {!isLoading && currentUser !== undefined ? (
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
          {!isLoading && currentUser ? (
            <Link onClick={() => handleCloseMobileNavbar()} to="/logout">
              <Button actionType="secondary" marginRight="true">
                Abmelden
              </Button>
            </Link>
          ) : (
            <Link onClick={() => handleCloseMobileNavbar()} to="/login">
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
