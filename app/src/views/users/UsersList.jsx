import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {

  remove(id) {
    console.log('remove', id);
  }

  render() {

    return (
      <div className="content">
        <Grid fluid>
          <NavLink to="/admin/new/user" className="nav-link pull-right" activeClassName="active">
            <Button bsStyle="info mb-30" pullRight fill type="submit">
              Adicionar usuário
            </Button>
          </NavLink>
          <Row>
            <Col md={12}>
              <Card
                title="Listagem de usuários"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td><Link to={`/admin/edit/user/${prop[0]}`}>Editar</Link></td>
                            <td><a onClick={() => this.remove(prop[0])} className="cursor-pointer">Excluir</a></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
}

export default TableList;
