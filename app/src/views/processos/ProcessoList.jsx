import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import api from "services/api";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { processosArray } from "variables/Variables.jsx";

class ProcessoList extends Component {

  state = {
    processos: []
  }

  componentDidMount() {
    this.loadProcessos();
  }

  loadProcessos = async () => {
    const { data } = await api.get("processos");
    this.setState({ processos: this.formatProcessos(data) })
  }

  formatProcessos = (processos) => {
    const result = [];
    processos.forEach(processo => {
      const array = [];
      array.push(processo.id);
      result.push(array);
    })
    return result;
  }

  render() {

    const { processos } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          
          <Row>
            <Col md={12}>
            <NavLink to="/home/new/processo" className="nav-link pull-right" activeClassName="active">
            <Button bsStyle="info" margin pullRight fill type="submit">
              Adicionar processo
            </Button>
          </NavLink>
              <Card
                title="Listagem de processos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {processosArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {processos.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{"COD 000000000" + prop}</td>;
                            })}
                            <td><Link to={`/home/view/processo/${prop[0]}`}>Visualizar</Link></td>
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

export default ProcessoList;
