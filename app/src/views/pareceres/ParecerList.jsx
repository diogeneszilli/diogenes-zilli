import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import api from "services/api";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { pareceresArray } from "variables/Variables.jsx";

class ParecerList extends Component {

  state = {
    pareceres: []
  }

  componentDidMount() {
    this.loadPareceres();
  }

  loadPareceres = async () => {
    const { data } = await api.get("processos/parecer-pendente/" + localStorage.getItem("Cod"));
    this.setState({ pareceres: this.formatPareceres(data) })
  }

  formatPareceres = (pareceres) => {
    const result = [];
    pareceres.forEach(parecer => {
      const array = [];
      array.push(parecer.id.toString());
      result.push(array);
    })
    return result;
  }

  render() {

    const { pareceres } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          
          <Row>
            <Col md={12}>
              <Card
                title="Listagem de pareceres"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {pareceresArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {pareceres.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{"COD 000000000" + prop}</td>;
                            })}
                            {console.log(prop)}
                            <td><Link to={`/home/edit/parecer/${prop}`}>Adicionar</Link></td>
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
