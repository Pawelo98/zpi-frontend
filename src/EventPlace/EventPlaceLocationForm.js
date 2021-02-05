import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { validation } from "../Register/validationRules";
import { Input, Form } from "antd";

import "antd/dist/antd.less";
import "../index.css";

const FormItem = Form.Item;

class EventPlaceLocationForm extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <Form onSubmit={this.onSubmit} autoComplete="off">
            <Segment stacked>
              <FormItem
                hasFeedback
                style={{ marginBottom: 12 }}
                autoComplete="off"
                validateStatus={this.props.eventPlaceCity.validateStatus}
                help={this.props.eventPlaceCity.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceCity"
                  value={this.props.eventPlaceCity.value}
                  placeholder="Miasto"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceCity
                    );
                  }}
                />
              </FormItem>

              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlacePostalCode.validateStatus}
                help={this.props.eventPlacePostalCode.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlacePostalCode"
                  value={this.props.eventPlacePostalCode.value}
                  placeholder="Kod pocztowy"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlacePostalCode
                    );
                  }}
                />
              </FormItem>

              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlaceStreet.validateStatus}
                help={this.props.eventPlaceStreet.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceStreet"
                  value={this.props.eventPlaceStreet.value}
                  placeholder="Ulica"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceStreet
                    );
                  }}
                />
              </FormItem>

              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={
                  this.props.eventPlaceStreetNumber.validateStatus
                }
                help={this.props.eventPlaceStreetNumber.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceStreetNumber"
                  value={this.props.eventPlaceStreetNumber.value}
                  placeholder="Numer budynku/lokalu"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceStreetNumber
                    );
                  }}
                />
              </FormItem>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventPlaceLocationForm;
