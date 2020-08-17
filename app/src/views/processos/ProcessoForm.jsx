import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ProcessoForm extends Component {

  state = {
    processo: {
      pareceres: []
    },
    users: [],
    selectedUsers: []
  }

  async componentDidMount() {
    const TRIADOR_ID = 3;
    this.loadUsers(TRIADOR_ID);
  }

  refreshPage() {
    window.location.reload(false);
  }

  async loadUsers(roleId) {
    const { data } = await api.get(`usuarios/byRoleId/${roleId}`);
    this.setState({ users: data })
  }

  async saveProcesso(processo) {
    processo.pareceres = this.addPareceres();
    await api.post(`processos`, processo);
    this.refreshPage();
  }

  addPareceres() {
    const pareceres = [];
    this.state.selectedUsers.forEach(selected => {
      let parecer = {};
      parecer.pendente = true;
      parecer.user = selected;
      pareceres.push(parecer);
    })
    return pareceres;
  }

  changeList(user) {
    if (this.state.selectedUsers.includes(user)) {
      let index = this.state.selectedUsers.indexOf(user);
      this.state.selectedUsers.splice(index, 1);
    } else {
      this.state.selectedUsers.push(user);
    }
  }

  render() {

    const { processo, users } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Criar processo"
                content={
                  <form>   
                    <label>Usuários a incluir pareceres no processo:</label>
                    {users.map((prop, key) => {
                        return <div key={prop.id + "div"} className="form-check checkbox-margin-bottom">
                        <input key={prop.id + "input"} onClick={() => this.changeList(prop)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label key={prop.id + "label"} className="form-check-label checkbox-margin-left">{prop.name}</label>
                      </div>
                      })}              
                    <NavLink to="/home/processo" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill>
                        Cancelar
                      </Button>
                    </NavLink>
                    <NavLink to="/home/new/processo" activeClassName="active">
                      <Button 
                        onClick={() => this.saveProcesso(processo)}
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

export default ProcessoForm;
