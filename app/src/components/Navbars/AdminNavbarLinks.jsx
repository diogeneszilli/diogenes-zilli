import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div className="pull-right">
        <Nav>
          <NavItem href="/logout" onClick={() => localStorage.clear()}>
          Logout ({localStorage.getItem("Username")})
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
