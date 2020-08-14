import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserForm extends Component {

  state = {
    user: {
      name: "",
      password: "",
      roles: [{
        id: 1,
        role: "ADMINISTRADOR"
      }],
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (!!id) {
      this.loadUser(id);
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  async loadUser(id) {
    const { data } = await api.get(`usuarios/${id}`);
    this.setState({ user: data })
  }

  async saveUser(user) {
    if (!!user.id) {
      await api.put(`usuarios/${user.id}`, user);
    } else {
      await api.post(`usuarios`, user);
      this.refreshPage();
    }
  }

  changeName(e) {
    let { user } = this.state;
    user.name = e.target.value;
    this.setState({ user: user })
  }

  changePassword(e) {
    let { user } = this.state;
    user.password = e.target.value;
    this.setState({ user: user })
  }

  changeRole(e) {
    let { user } = this.state;
    user.roles.pop();
    user.roles.push(this.selectRole(e.target.value));
    this.setState({ user: user })
  }

  selectRole(roleName) {
    let role = {}
    const ADM = "ADMINISTRADOR";
    const TRI = "TRIADOR";
    const FIN = "FINALIZADOR";
    if (roleName === ADM) {
      role.id = 1;
      role.role = ADM;
    }
    if (roleName === TRI) {
      role.id = 2;
      role.role = TRI;
    }
    if (roleName === FIN) {
      role.id = 3;
      role.role = FIN;
    }
    return role;
  }

  render() {

    const { user } = this.state;
    const id = this.props.match.params.id;
    const passwordLabel = !!id ? "New Password" : "Password";

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={!!this.props.match.params.id ? "Editar usuário" : "Criar usuário"}
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          required: true,
                          defaultValue: user.name,
                          onChange:(event) => this.changeName(event)
                        },
                        {
                          label: passwordLabel,
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Password",
                          required: true,
                          defaultValue: user.password,
                          onChange:(event) => this.changePassword(event)
                        }
                      ]}
                    />
                  <label>Role</label>
                  <select required className="form-control" value={user.roles[0].role} onChange={(event) => this.changeRole(event)}>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="TRIADOR">Triador</option>
                    <option value="FINALIZADOR">Finalizador</option>
                  </select>
                    
                    <NavLink to="/admin/user" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill>
                        Cancelar
                      </Button>
                    </NavLink>
                    <NavLink to="/admin/new/user" activeClassName="active">
                      <Button 
                        onClick={() => this.saveUser(user)}
                        disabled={(!!!this.state.user.name || !!!this.state.user.password)}
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

export default UserForm;
