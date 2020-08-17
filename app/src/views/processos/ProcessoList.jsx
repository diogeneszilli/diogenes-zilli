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
      array.push("COD 000000000" + processo.id.toString());
      result.push(array);
    })
    return result;
  }

  async remove(id) {
    await api.delete(`processos/${id}`);
    this.loadProcessos();
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
                              return <td key={key}>{prop}</td>;
                            })}
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
