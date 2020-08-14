import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div className="pull-right">
        <Nav>
          <NavItem eventKey={3} href="#">
            Logout
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
