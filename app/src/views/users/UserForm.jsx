import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserForm extends Component {

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log('edit id', id)
}

  render() {

    const passwordLabel = !!this.props.match.params.id ? "New Password" : "Password";

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
                          defaultValue: ""
                        },
                        {
                          label: passwordLabel,
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Password",
                          defaultValue: ""
                        }
                      ]}
                    />
    
                  <label>Role</label>
                  <select ng-selected="vm.tipoUsuario" ng-model="vm.tipoUsuario" class="form-control" ng-options="i.tipo for i in vm.tiposUsuario track by i._id"></select>
                    
                    <NavLink to="/admin/user" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill type="submit">
                        Cancelar
                      </Button>
                    </NavLink>
                    <Button bsStyle="info" pullRight marginLeftTop fill type="submit">
                    {!!this.props.match.params.id ? "Atualizar" : "Salvar"}
                    </Button>
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
