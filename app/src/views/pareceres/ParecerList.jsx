import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import api from "services/api";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class ParecerList extends Component {

  state = {
    pareceres: []
  }

  componentDidMount() {
    this.loadPareceres();
  }

  loadPareceres = async () => {
    const { data } = await api.get("pareceres");
    this.setState({ pareceres: this.formatUsers(data) })
  }

  formatPareceres = (pareceres) => {
    const result = [];
    pareceres.forEach(parecer => {
      const array = [];
      array.push(parecer.id.toString());
      array.push(parecer.name);
      array.push(parecer.roles[0].role);
      result.push(array);
    })
    return result;
  }

  async remove(id) {
    await api.delete(`pareceres/${id}`);
    this.loadParecer();
  }

  render() {

    const { pareceres } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          
          <Row>
            <Col md={12}>
            <NavLink to="/home/new/parecer" className="nav-link pull-right" activeClassName="active">
            <Button bsStyle="info" margin pullRight fill type="submit">
              Adicionar parecer
            </Button>
          </NavLink>
              <Card
                title="Listagem de pareceres"
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
                      {pareceres.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td><Link to={`/home/edit/parecer/${prop[0]}`}>Editar</Link></td>
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

export default ParecerList;
