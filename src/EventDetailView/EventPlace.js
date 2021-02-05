import React, { Component } from "react";
import {Segment, Grid, Image, Label} from "semantic-ui-react";
import { Link } from "react-router-dom";

class EventPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          placeID : '',
          placeName: "Orlik SP 13",
          placeDescription: "Super boisko polecam każdemu",
          placeStreet: "Super ulica",
          placeStreetNumber: "21-37",
          placePostalcode: "66-600",
          placeCity: "Krosno Odrzańskie",
          placePhoto: "https://react.semantic-ui.com/images/wireframe/image.png"
      }
    }

    componentDidMount () {
        if (this.props.eventID !== undefined) {
          this.setState({
            placeName: this.props.eventPlaceName,
            placeID : this.props.eventPlaceID,
            placeDescription: this.props.eventPlaceDescription,
            placeStreet: this.props.eventPlaceStreetName,
            placeStreetNumber: this.props.eventPlaceStreetNumber,
            placePostalcode: this.props.eventPlacePostCode,
            placeCity: this.props.eventPlaceCity,
          })
        }
      }

    render() {
        return(
            <Link to={`/eventplaceopinonform/${this.state.placeID}`}>
                <br/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Nazwa</Label>
                                {this.state.placeName}
                            </Segment>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Opis</Label>
                                {this.state.placeDescription}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Ulica</Label>
                                {this.state.placeStreet}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Numer</Label>
                                {this.state.placeStreetNumber}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Kod pocztowy</Label>
                                {this.state.placePostalcode}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <Label textAlign='left' attached="top left" color="orange">Miasto</Label>
                                {this.state.placeCity}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Image src={this.state.placePhoto}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Link>
        )
    }
}

export default EventPlace;