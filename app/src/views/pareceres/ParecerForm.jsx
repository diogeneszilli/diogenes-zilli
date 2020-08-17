import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { createBrowserHistory } from "history";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ParecerForm extends Component {

  state = {
    processo: {},
    descricao: "",
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (!!id) {
      this.loadProcesso(id);
    }
  }

  goToParecer() {
    createBrowserHistory().push("/home/parecer");
    window.location.reload(false);
  }

  async loadProcesso(id) {
    const { data } = await api.get(`processos/${id}`);
    this.setState({ processo: data })
  }

  async saveParecer(id) {
    this.mountParecerBeforeSave();
    await api.put(`processos/${id}`, this.state.processo);
    this.goToParecer();
  }

  mountParecerBeforeSave() {
    let parecerId = parseInt(localStorage.getItem("Cod"));
    this.state.processo.pareceres.forEach(parecer => {
      if (parecer.user.id === parecerId) {
        parecer.descricao = this.state.descricao;
        parecer.pendente = false;
      }
    })
    this.setState({ processo: this.state.processo });
  }

  changeParecer(e) {
    this.setState({ descricao: e.target.value })
  }

  render() {

    const { id } = this.props.match.params;
    const { parecer } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={`Adicionar parecer no Processo COD 000000000${id}.`}
                content={
                  <form>    
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Parecer</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descrição do parecer."
                            defaultValue={this.state.descricao}
                            onChange={(event) => this.changeParecer(event)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>                            
                    <NavLink to="/home/parecer" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill>
                        Cancelar
                      </Button>
                    </NavLink>
                    <NavLink to="/home/new/parecer" activeClassName="active">
                      <Button 
                        onClick={() => this.saveParecer(id)}
                        disabled={this.state.descricao.length === 0}
                        bsStyle="info" pullRight marginLeftTop fill>
                      {"Salvar"}
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

export default ParecerForm;
