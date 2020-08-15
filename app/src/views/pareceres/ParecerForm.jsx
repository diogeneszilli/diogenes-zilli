import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ParecerForm extends Component {

  state = {
    parecer: {}
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (!!id) {
      this.loadParecer(id);
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  async loadParecer(id) {
    const { data } = await api.get(`pareceres/${id}`);
    this.setState({ parecer: data })
  }

  async saveParecer(user) {
    if (!!user.id) {
      await api.put(`pareceres/${user.id}`, user);
    } else {
      await api.post(`pareceres`, user);
      this.refreshPage();
    }
  }

  render() {

    const { parecer } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={!!this.props.match.params.id ? "Editar parecer" : "Criar parecer"}
                content={
                  <form>                                  
                    <NavLink to="/home/parecer" activeClassName="active">
                      <Button bsStyle="danger" pullRight marginLeftTop fill>
                        Cancelar
                      </Button>
                    </NavLink>
                    <NavLink to="/home/new/parecer" activeClassName="active">
                      <Button 
                        onClick={() => this.saveParecer(parecer)}
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

export default ParecerForm;
