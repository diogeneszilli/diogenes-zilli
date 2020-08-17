import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import api from "services/api";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ProcessoView extends Component {

  state = {
    processo: {},
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    if (!!id) {
        this.loadProcesso(id);
    }
  }

  async loadProcesso(id) {
      console.log('load')
    const { data } = await api.get(`processos/${id}`);
    console.log('data', data)
    this.setState({ processo: data })
  }

  render() {

    const { id } = this.props.match.params;
    const { processo } = this.state;

    console.log('render', id, processo)

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={`Processo COD 000000000${id}.`}
                content={
                  <form>    
                    <Row>
                      <Col md={12}>
                          {
                              processo.id 
                              ? <div>
                              {processo.pareceres.map((prop, key) => {
                                return <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Parecer usuário: {prop.user.name}</ControlLabel>
                                <FormControl
                                  rows="5"
                                  componentClass="textarea"
                                  bsClass="form-control"
                                  placeholder="Parecer ainda não foi preenchido pelo usuário."
                                  defaultValue={prop.descricao}
                                  disabled
                                />
                              </FormGroup>
                              })}
                            </div>
                            : ""
                          }
                      </Col>
                    </Row>                            
                    <NavLink to="/home/processo" activeClassName="active">
                      <Button bsStyle="info" pullRight marginLeftTop fill>
                        Voltar
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

export default ProcessoView;
