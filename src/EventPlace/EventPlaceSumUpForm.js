import React, { Component } from "react";
import {
  Grid,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import { Form, Typography } from "antd";
import { Link } from "react-router-dom";
import Regulamin from "../Register/Regulamin";
import "antd/dist/antd.less";
import "../index.css";
import { Icon } from '@iconify/react';
import twotoneLocationCity from '@iconify/icons-ic/twotone-location-city';
import stadiumIcon from '@iconify/icons-mdi/stadium';
import cardText from '@iconify/icons-bi/card-text';
import signpostIcon from '@iconify/icons-oi/signpost';
import postalCode from '@iconify/icons-map/postal-code';



const FormItem = Form.Item;

class EventPlaceSumUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventPlaceName: "Nazwa miejsca",
      sportsCategory: "login użytkownika",
      eventPlaceDescription: "imie",
      eventPlaceCity: "nazwisko",
      eventPlacePostalCode: "email użytkownika",
      eventPlaceStreet: "https://react.semantic-ui.com/images/wireframe/image.png",
      eventPlaceStreetNumber: "telefon użytkownika",
    };

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.setState((props) => ({
        eventPlaceName: this.props.eventPlaceName,
        sportsCategory: this.props.sportsCategory,
        eventPlaceDescription: this.props.eventPlaceDescription,
        eventPlaceCity: this.props.eventPlaceCity,
        eventPlacePostalCode: this.props.eventPlacePostalCode,
        eventPlaceStreet: this.props.eventPlaceStreet,
        eventPlaceStreetNumber: this.props.eventPlaceStreetNumber,
    }));
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <Grid.Row>
            <Segment>
              <Icon icon={stadiumIcon} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceName}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={cardText} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceDescription}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={twotoneLocationCity} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceCity}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={postalCode} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlacePostalCode}
              </Typography>
            </Segment>
            <Segment>
              <Icon icon={signpostIcon} width="2em" height="2em" />
              <Typography
                style={{
                  paddingVertical: 15,
                }}
              >
                {this.props.eventPlaceStreet}
              </Typography>
            </Segment>
            <Segment>
              <Checkbox
                onChange={this.props.toggleAgreement}
                label={
                  <label
                    style={{
                      "line-height": 16,
                    }}
                  >
                    Zapoznałem się z regulaminem i akceptuję wszystkie jego
                    postanowienia, aby móc zaproponować obiekt opisany w
                    formularzu.{" "}
                    <FormItem as={Link} onClick={this.handleToggleModal}>
                      Regulamin
                    </FormItem>
                  </label>
                }
              />
            </Segment>
          </Grid.Row>
        </Grid.Column>
        <Regulamin isOpen={this.state.open} onClose={this.handleToggleModal} />
      </Grid>
    );
  }
}

export default EventPlaceSumUpForm;






