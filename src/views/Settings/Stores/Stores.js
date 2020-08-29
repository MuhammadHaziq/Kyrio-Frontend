import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, FormGroup, Input, Label, Fade } from 'reactstrap';
import AddStore from "./AddStore";

class Stores extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked: [false, false],
            fadeStore: true,
            fadeAddStore: false,
            timeout: 300
        }
    }
    handleClick = (field) => {
        const prevState = this.state.checked;
        let state;
        if(field == 0){
            if(this.state.checked[field]){
                state = prevState.map((x, index) => (false));
            }else{
                state = prevState.map((x, index) => (true));
            }
        }else{
            state = prevState.map((x, index) => (field === index ? !x : x));
        }
        this.setState({
            checked: state
        });
    }
    editBillingDetails = () =>{
        this.setState({
            fadeStore: false,
            fadeAddStore: true
        });
      }
      goBack = () =>{
        this.setState({
          fadeStore: true,
          fadeAddStore: false
        });
      }
  render() {
      const { checked, timeout, fadeStore, fadeAddStore } = this.state;
    return (
      <div className="animated fadeIn">
          {fadeAddStore ? <Fade timeout={timeout} in={fadeAddStore}>
            <AddStore goBack={this.goBack} />
          </Fade>
          :""}
          {fadeStore ? <Fade timeout={timeout} in={fadeStore}>
            <Row>
            <Col xs="12" lg="12">
                <Card>
                <CardHeader>
                    <Row>
                <Col xs="12" lg="6">
                    <Button color="success" onClick={this.editBillingDetails}>
                    <i className="fa fa-plus"></i> ADD STORE
                        </Button>
                        {checked.filter(item => item == true).length > 0 ?
                            <Button style={{marginLeft: "2%"}}>
                                <i className="fa fa-trash"></i> DELETE
                            </Button>
                        : ""}
                        </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                    <Table responsive>
                    <thead>
                    <tr>
                        <th><FormGroup check className="checkbox">
                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" checked={checked[0]} onClick={()=>this.handleClick(0)} />
                            <Label check className="form-check-label" htmlFor="checkbox1">Name</Label>
                        </FormGroup></th>
                        <th>Address</th>
                        <th>Number of POS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><FormGroup check className="checkbox">
                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="Cash" checked={checked[1]} onClick={()=>this.handleClick(1)}/>
                            <Label check className="form-check-label" htmlFor="checkbox1">Store 1</Label>
                        </FormGroup></td>
                        <td>Lahore</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><FormGroup check className="checkbox">
                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="Check" checked={checked[2]} onClick={()=>this.handleClick(2)}/>
                            <Label check className="form-check-label" htmlFor="checkbox1">Store 2</Label>
                        </FormGroup></td>
                        <td>Pakistan</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                    </Table>
                </CardBody>
                </Card>
            </Col>
            </Row>
          </Fade>
          :""}
      </div>

    );
  }
}

export default Stores;
