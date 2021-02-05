import React, { Component } from "react";
import { Grid, Select, Form, Icon, Button, Segment, Header, List } from "semantic-ui-react";
import {
    DateInput,
    TimeInput
} from 'semantic-ui-calendar-react';
import { eventService, sportCategoryService } from "../Api/Api";
import * as moment from 'moment';
import EventAvaliable from "./EventsAvaliable";

class SearchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            dateTime: '',
            datesRange: '',
            events: [],
            sportCategories: [],
            isLoading: false,
            sportCategory: '',
            wasSubmited: false
        };
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        eventService.getAllEvents(this.state.sportCategory, this.state.date, this.state.time).then((response) => {
            this.setState({ events: response })
            this.setState({ isLoading: false })
            console.log(this.state.events)
            this.setState({ wasSubmited: true });
            console.log(this.state.time);
            console.log(this.state.date);
        }
        ).catch(
            (error) => console.log("Error")
        );

        //console.log(this.state.sportCategories)
        //console.log(this.state.dateTime);
    }


    fetchSportCategory () {
        sportCategoryService.getAllSportsCat().then((response) => {
            console.log(response)
            this.setState({
                sportCategories: response.map(
                    (cat) => JSON.parse('{"key" : ' + cat.sportsCategoryID + ', "text" : "' + cat.sportsCategoryName + '", "value" :' + cat.sportsCategoryID + '}')
                )
            })
            console.log(this.state.sportCategories[0].text)



        }
        ).catch(
            (error) => console.log("ERROR")
        );
    }


    componentWillMount () {
        this.fetchSportCategory();
        console.log("Mounted component");
        this.setState({
            date: moment().format("DD-MM-YYYY"),
        })
    }

    render () {
        return (
            <Grid textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <Segment padded >
                            <Form >
                                <Header as='h1' color='orange'>
                                    Wyszukaj wydarzenie!
                            </Header>
                                <Form.Group widths='equal'>
                                    <Form.Field required><Select options={this.state.sportCategories}
                                        name="sportCategory"
                                        value={this.state.sportCategory}
                                        placeholder="Wybierz kategorię"
                                        onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field required>
                                        <DateInput
                                            name="date"
                                            placeholder="Data wydarzenia"
                                            iconPosition='left'
                                            value={this.state.date}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <TimeInput
                                            name="time"
                                            placeholder="Czas wydarzenia"
                                            value={this.state.time}
                                            iconPosition="left"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Button fluid animated color="orange" onClick={this.handleSubmit}
                                        loading={this.state.isLoading}
                                    >
                                        <Button.Content visible>Wyszukaj</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='search' />
                                        </Button.Content>
                                    </Form.Button>
                                </Form.Group>
                            </Form>
                        </Segment>
                        {
                            this.state.events.length > 0 &&
                            <Segment textAlign='left'>
                                <List divided verticalAlign='middle' size='huge'>
                                    {this.state.events.map((event) =>
                                        <Segment>

                                            <EventAvaliable key={event.eventID} dataFromParent={event}>

                                            </EventAvaliable>
                                        </Segment>

                                    )}
                                </List>
                            </Segment>
                        }
                        {
                            this.state.events.length === 0 && this.state.wasSubmited &&
                            <Segment textAlign='center'>
                                <Header as='h1' color='orange'>Nie znaleziono wydarzeń</Header>
                            </Segment>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default SearchView;