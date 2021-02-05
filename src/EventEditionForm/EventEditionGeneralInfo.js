import React, { Component } from 'react';
import { Grid, Segment } from "semantic-ui-react";
import { validation } from "../Register/validationRules"
import { Input, Form } from "antd";
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import "antd/dist/antd.less";
import "../index.css";
const FormItem = Form.Item;

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class EventEditionGeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    render () {
        return (
            <Grid textAlign="center">
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Form onSubmit={this.onSubmit} autoComplete="off">
                        <Segment stacked>
                            <FormItem
                                hasFeedback
                                style={{ marginBottom: 12 }}
                                autoComplete="off"
                                validateStatus={this.props.eventName.validateStatus}
                                help={this.props.eventName.errorMsg}
                            >
                                <Input
                                    autoComplete="off"
                                    name="eventName"
                                    value={this.props.eventName.value}
                                    placeholder="Nazwa wydarzenia"
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateEventPlaceName
                                        );
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.eventDescription.validateStatus}
                                help={this.props.eventDescription.errorMsg}
                            >
                                <Input
                                    autoComplete="off"
                                    name="eventDescription"
                                    value={this.props.eventDescription.value}
                                    placeholder="Opis wydarzenia"
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateEventPlaceDescription
                                        );
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.eventMaxPlayers.validateStatus}
                                help={this.props.eventMaxPlayers.errorMsg}
                            >
                                <Input
                                    autoComplete="off"
                                    name="eventMaxPlayers"
                                    value={this.props.eventMaxPlayers.value}
                                    placeholder="Maksymalna liczba graczy"
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateEventMaxPlayers
                                        );
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.eventCity.validateStatus}
                                help={this.props.eventCity.errorMsg}
                            >
                                <Input
                                    autoComplete="off"
                                    name="eventCity"
                                    value={this.props.eventCity.value}
                                    placeholder="Miasto"
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateEventCity
                                        );
                                    }}
                                />
                            </FormItem>
                            <FormItem style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.sportCategory.validateStatus}>
                                <Select
                                    style={{ width: 821 }}
                                    value={this.props.sportCategory.value}
                                    input={<BootstrapInput />}
                                    name="sportCategory"
                                    disabled={this.props.eventCity.value.length < 3}
                                    onChange={(event) => {
                                        this.props.onChangeSportCategory(
                                            event,
                                            validation.validateSelect
                                        );
                                    }}
                                >
                                    {this.props.sportCategories
                                        .map((sportCategory) => (
                                            <MenuItem value={sportCategory.sportsCategoryID}>{sportCategory.sportsCategoryName}</MenuItem>
                                        ))}
                                </Select>
                                <FormHelperText>Dyscyplina</FormHelperText>
                            </FormItem>
                            <FormItem style={{ marginBottom: 12 }}
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.props.eventPlace.validateStatus}>
                                <Select
                                    style={{ width: 821 }}
                                    value={this.props.eventPlace.value}
                                    input={<BootstrapInput />}
                                    name="eventPlace"
                                    disabled={this.props.sportCategory.validateStatus !== "success"}
                                    onChange={(event) => {
                                        this.props.onChange(
                                            event,
                                            validation.validateSelect
                                        );
                                    }}
                                >
                                    {this.props.eventPlaces
                                        .map((eventPlace) => (
                                            <MenuItem value={eventPlace.eventPlaceId}>{eventPlace.name} {eventPlace.code} {eventPlace.city}</MenuItem>
                                        ))}
                                </Select>
                                <FormHelperText>Miejsce</FormHelperText>
                            </FormItem>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventEditionGeneralInfo;