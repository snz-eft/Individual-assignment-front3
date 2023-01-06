import classNames from "classnames";
import { NavLink, useMatch } from "react-router-dom";

export default function Header() {
  const isHome = useMatch("/");
  return (
    <header>
      <div className={classNames({ header: true, relative: !isHome })}>
        <nav className="menu-wrapper">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/properties">Properties</NavLink>
            </li>
            <li>
              <NavLink to="/add-property">Add</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
          </ul>
        </nav>
        <h1 className="logo">SunHouse</h1>
        <div className="search">
          <input type="search" className="" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
}
