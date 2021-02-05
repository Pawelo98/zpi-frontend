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
import cardText from '@iconify/icons-bi/card-text';
import signpostIcon from '@iconify/icons-oi/signpost';
import postalCode from '@iconify/icons-map/postal-code';

const FormItem = Form.Item;

class EventSumUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            eventName: "Nazwa miejsca",
            sportsCategory: "login użytkownika",
            eventDescription: "imie",
            eventPlace: "nazwisko",
            eventDate: "email użytkownika",
            eventTime: "email użytkownika"
        };

        this.wrapper = React.createRef();
    }

    componentDidMount () {
        this.setState((props) => ({
            eventName: this.props.eventName,
            sportsCategory: this.props.sportCategory,
            eventDescription: this.props.eventDescription,
            eventPlace: this.props.eventPlace,
            eventDate: this.props.eventDate,
            eventTime: this.props.eventTime
        }));
    }

    render () {
        return (
            <Grid textAlign="center">
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Grid.Row>
                        <Segment>
                            <Icon icon={signpostIcon} width="2em" height="2em" />
                            <Typography
                                style={{
                                    paddingVertical: 15,
                                }}
                            >
                                {this.props.eventName.value}
                            </Typography>
                        </Segment>
                        <Segment>
                            <Icon icon={cardText} width="2em" height="2em" />
                            <Typography
                                style={{
                                    paddingVertical: 15,
                                }}
                            >
                                {this.props.eventDescription.value}
                            </Typography>
                        </Segment>
                        <Segment>
                            <Icon icon={postalCode} width="2em" height="2em" />
                            <Typography
                                style={{
                                    paddingVertical: 15,
                                }}
                            >
                                {this.props.eventDate.value} {this.props.eventTime.value}
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

export default EventSumUp;
