import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Collapse,
    Fade,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from "reactstrap";
import PrintIcon from '@material-ui/icons/Print';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';

class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
        collapse: [true,true],
        fade: true,
        expRight: false,
        subscribe: false,
        timeout: 300,
        fields: {
        email: "",
        business: "",
        timezone: "",
        language: ""
        },
        errors: {
        email: false,
        business: false,
        timezone: false,
        language: false
        }
    };
  }
  toggle = (tab) => {
    const prevState = this.state.collapse;
    const state = prevState.map((x, index) => (tab === index ? !x : x));

    this.setState({
        collapse: state,
    });
  };
  goBack = () => {
    this.props.goBack();
  }
    render() {
    return (
      <div className="animated fadeIn">
        <Fade timeout={this.state.timeout} in={this.state.fade}>
            <Card>
                  <CardHeader>
                  <h4> <strong>Add Printer Group</strong>
                    <div className="card-header-actions">
                      <a  className="card-header-action btn btn-minimize" data-target="#collapse" onClick={() => this.toggle(0)}><i className={this.state.collapse[0] ? "icon-arrow-up" : "icon-arrow-down"}></i></a>
                    </div>
                    </h4>
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse[0]} id="collapse">
                  <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="storeName">Name</Label>
                      <InputGroup>
                      <Input type="text" id="storeName" placeholder="Name" required />
                      <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <PrintIcon />
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="storeAddress">Address</Label>
                      <InputGroup>
                      <Input type="text" id="storeAddress" placeholder="Name" required />
                      <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <RoomIcon />
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="storePhone">Phone</Label>
                      <InputGroup>
                      <Input type="text" id="storePhone" placeholder="Name" required />
                      <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <PhoneIcon />
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="storeDescription">Description</Label>
                      <InputGroup>
                      <Input type="text" id="storeDescription" placeholder="Name" required />
                      <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <DescriptionIcon />
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm xs="12" className="text-center mt-3">
                    <Button color="secondary" block className="btn-pill pull-right" outline onClick={this.goBack}>
                      BACK
                    </Button>
                  </Col>
                  <Col sm xs="12" className="text-center mt-3">
                    <Button color="danger" block className="btn-pill pull-right" outline onClick={this.goBack}>
                      CANCEL
                    </Button>
                  </Col>
                  <Col sm xs="12" className="text-center mt-3">
                    <Button color="success" block className="btn-pill pull-right" outline>
                      SAVE
                    </Button>
                  </Col>
                </Row>
                  </CardBody>
                  </Collapse>
            </Card>
          </Fade>
      </div>
    );
  }
}

export default AddStore;
