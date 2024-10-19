import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <a className="navbar-brand no-highlight">
          <span className="navbar-brand-text no-highlight">Simplify</span>
          <Link className="nav-link" to="">
            HOME
          </Link>
          <Link className="nav-link" to="/input">
            ADD TASK
          </Link>
          <Link
            to="/profile"
            className="nav-link btn btn-outline-success btn-profile"
            type="submit"
            style={{ marginLeft: 10 }}
          >
            PROFILE
          </Link>
        </a>
      </nav>
    </>
  );
};
/*
<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand no-highlight">
            <span className="navbar-brand-text no-highlight">App</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-item active" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item active" to="input">
                  ADD TASK
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <Link
                to="/profile"
                className="btn btn-outline-success btn-profile"
                type="submit"
                style={{ marginLeft: 10 }}
              >
                PROFILE
              </Link>
            </form>
          </div>
        </div>
      </nav>
      */
export default Navbar;
