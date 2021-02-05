import React, { Component } from "react";
import { Label, Grid, Segment } from 'semantic-ui-react'
import EventData from "./EventData"
import EventPlace from "./EventPlace"
import { eventViewService } from "../Api/Api"
import LoadingIndicator from "../common/LoadingIndicator";
import Participant from './Participant';


class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            event: null,
            participants: []
        }
    }

    componentDidMount () {
        const eventId = this.props.match.params.eventID;
        this.loadEventData(eventId);
        this.loadParticipants(eventId);
    }

    loadEventData (eventID) {
        eventViewService
            .getEventInfo(eventID)
            .then((response) => {
                this.setState({
                    event: response,
                    isLoading: false,
                });
                console.log(response);
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false,
                    });
                }
            });
    }

    loadParticipants (eventId) {
        eventViewService
            .getParicipants(eventId)
            .then((response) => {
                this.setState({
                    participants: response,
                    isLoading: false,
                });
                console.log(response);
                console.log("SUKCES")
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false,
                    });
                }
            });
    }

    render () {

        if (this.state.isLoading) {
            return <LoadingIndicator />;
        } else {
            return (
                <Grid
                    textAlign="center"
                    stackable
                    columns={3}
                >
                    <Grid.Column mobile={16} tablet={8} computer={3}>
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Informacje o wydarzeniu</Label>
                            <EventData {...this.state.event} currentUser={this.props.currentUser}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8} >
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Informacje o miejscu</Label>
                            <EventPlace {...this.state.event} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign="left" mobile={16} tablet={8} computer={3}>
                        <Segment>
                            <Label textAlign='center' attached="top" color="orange">Uczestnicy</Label>
                            <Grid >
                                <Grid.Row columns={3}>
                                    {this.state.participants.map((participant) => (
                                        <Grid.Column >
                                            <Participant dataFromParent={participant} />
                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
                            </Grid>

                        </Segment>
                    </Grid.Column>
                </Grid>)
        }
    }
}

export default EventView;