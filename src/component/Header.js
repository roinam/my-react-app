import React from "react";
import Logo from "../assets/logo.png"
import { useAppData } from "../context/appContext";
import "./Header.css";
import { css } from '@emotion/react';
import { ErrorTest } from "./ErrorTest";

export default class Header extends React.Component {

  // const { title } = useAppData();

    constructor(prop) {
      super(prop);
      this.state = {showError: false};
    };

    handleShowError = () => {
        console.log("Clicked on Show Error");
        this.setState({showError: true});
    };

    render () {
      const linkStyle = css`
    padding-left: 25px;
    font-weight: bold;
  `;

      return (
        <nav className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
          <a className="navbar-brand" css={linkStyle} href="/">
            <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
            <span className="head-title">Employee Management System</span>
          </a>
          <a href="#" onClick={this.handleShowError}>Show Error</a>
          {this.state.showError && <ErrorTest></ErrorTest>}
        </nav>
      );
    }
}
