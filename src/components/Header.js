import React from "react";
import "../styles/header.scss";

// import { ReactComponent as LogoDark } from "../logo/small-dark.svg"
// import { ReactComponent as LogoLight } from "../logo/small-light.svg"
// import { ReactComponent as LogoDark } from "../logo/big-dark.svg"
import { ReactComponent as LogoLight } from "../logo/big-light.svg";

import { ReactComponent as GithubIcon } from "../social-icons/github.svg";
import { ReactComponent as TwitterIcon } from "../social-icons/twitter.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="container flex-spacebetween">
        <a href="https://Kuntal-Das.github.io/Rhythm">
          <LogoLight className="logo" />
        </a>
        <div>
          <a
            className="icon-link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Kuntal-Das/Rhythm"
          >
            <GithubIcon className="icon" />
          </a>
          <a
            className="icon-link"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/Kuntal449"
          >
            <TwitterIcon className="icon" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
