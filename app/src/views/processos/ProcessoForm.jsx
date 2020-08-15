import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ProcessoForm extends Component {

  state = {
    processo: {}
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (!!id) {
      this.loadProcessos(id);
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  async loadProcessos(id) {
    const { data } = await api.get(`processos/${id}`);
    this.setState({ processo: data })
  }

  async saveProcesso(processo) {
    if (!!processo.id) {
      await api.put(`processos/${processo.id}`, processo);
    } else {
      await api.post(`processos`, processo);
      this.refreshPage();
    }
  }

  render() {

    const { processo } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={!!this.props.match.params.id ? "Editar processo" : "Criar processo"}
                content={
                  <form>                 
                    <NavLink to="/home/processo" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill>
                        Cancelar
                      </Button>
                    </NavLink>
                    <NavLink to="/home/new/processo" activeClassName="active">
                      <Button 
                        onClick={() => this.saveProcesso(processo)}
                        disabled
                        bsStyle="info" pullRight marginLeftTop fill>
                      {!!this.props.match.params.id ? "Atualizar" : "Salvar"}
                      </Button>
                    </NavLink>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProcessoForm;
