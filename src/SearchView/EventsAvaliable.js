import React, { Component } from 'react';
import { Grid, GridColumn, Image, Progress, GridRow, Button } from 'semantic-ui-react'
import { eventService, participationService } from '../Api/Api';
import { Link } from "react-router-dom";
import badmintonSingle from "../Icons/colorScale/badmintonSingle.svg";
import badmintonDouble from "../Icons/colorScale/badmintonDouble.svg";
import basketball from "../Icons/colorScale/basketball.svg";
import climbing from "../Icons/colorScale/climbing.svg";
import cycling from "../Icons/colorScale/cycling.svg";
import handball from "../Icons/colorScale/handball.svg";
import indoor from "../Icons/colorScale/indoor.svg";
import pingpong from "../Icons/colorScale/pingpong.svg";
import running from "../Icons/colorScale/running.svg";
import soccer from "../Icons/colorScale/soccer.svg";
import squash from "../Icons/colorScale/squash.svg";
import swimming from "../Icons/colorScale/swimming.svg";
import tennisDouble from "../Icons/colorScale/tennisDouble.svg";
import tennisSingle from "../Icons/colorScale/tennisSingle.svg";
import volleyball from "../Icons/colorScale/volleyball.svg";


class EventAvaliable extends Component {
  constructor(propos) {
    super(propos);

    this.state = {
      eventID: 0,
      sportName: "Piłka nożna",
      sportIconLink:
        "https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg",
      eventDate: "",
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: 3,
      placeName: "Nazwa miejsca",
      streetName: "Nazwa ulicy",
      streetNumber: "numer",
      city: "Miasto",
      eventTime: "",
      joinned: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.dataFromParent.eventID !== undefined) {
      eventService
        .countEventParticipants(this.props.dataFromParent.eventID)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber: response,
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              actuallPartcipantNumber: 1,
            });
          } else {
            this.setState({
              actuallPartcipantNumber: 1,
            });
          }
        });
    }

    participationService
      .participationExists(this.state.eventID)
      .then((response) => {
        this.setState({
          joinned: response,
        });
        console.log(this.state.eventID + " joinned : " + this.state.joinned);
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({});
        } else {
          this.setState({});
        }
      });
  }
  componentWillMount() {
    this.setState({
      eventID: this.props.dataFromParent.eventID,
      sportName: this.props.dataFromParent.eventSportName,
      sportIconLink:
        "https://ecsmedia.pl/c/serwetki-pilka-nozna-33-cm-20-sztuk-w-iext54112696.jpg",
      eventDate: this.props.dataFromParent.eventDate,
      eventTime: this.props.dataFromParent.eventTime,
      actuallPartcipantNumber: 1,
      maxPartcipantNumber: this.props.dataFromParent.maxPlayers,
      placeName: this.props.dataFromParent.eventPlaceName,
      streetName: this.props.dataFromParent.eventPlaceStreetName,
      streetNumber: this.props.dataFromParent.eventPlaceStreetNumber,
      city: this.props.dataFromParent.eventPlaceCity,
    });
    console.log(this.state.eventID);
  }

  joinEvent = () => {
    console.log("Joining event : " + this.state.eventID);
    this.setState({ isLoading: true });
    participationService
      .joinEvent(this.state.eventID)
      .then((response) => {
        this.setState({
          joinned: true,
          isLoading: false,
        });
        console.log(this.state.eventID + " joinned : " + this.state.joinned);
        this.updateParticipants();
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({});
        } else {
          this.setState({});
        }
      });
  };

  leaveEvent = () => {
    console.log("Leaving event : " + this.state.eventID);
    this.setState({ isLoading: true });
    participationService
      .leaveEvent(this.state.eventID)
      .then((response) => {
        this.setState({
          joinned: false,
          isLoading: false,
        });
        console.log(this.state.eventID + " joinned : " + this.state.joinned);
        this.updateParticipants();
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  updateParticipants() {
    console.log("updating participants");
    eventService
      .countEventParticipants(this.state.eventID)
      .then((response) => {
        this.setState({
          actuallPartcipantNumber: response,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        } else {
          this.setState({
            actuallPartcipantNumber: 1,
          });
        }
      });
  }

  renderSwitch(param) {
    switch (param) {
      case "Piłka nożna":
        return <Image src={soccer} />;
      case "Siatkówka":
        return <Image src={volleyball} />;
      case "Koszykówka":
        return <Image src={basketball} />;
      case "Piłka halowa":
        return <Image src={indoor} />;
      case "Piłka ręczna":
        return <Image src={handball} />;
      case "Tenis ziemny - single":
        return <Image src={tennisSingle} />;
      case "Tenis ziemny - debel":
        return <Image src={tennisDouble} />;
      case "Squash":
        return <Image src={squash} />;
      case "Badminton - single":
        return <Image src={badmintonSingle} />;
      case "Badminton - debel":
        return <Image src={badmintonDouble} />;
      case "Bieganie":
        return <Image src={running} />;
      case "Kolarstwo":
        return <Image src={cycling} />;
      case "Pływanie":
        return <Image src={swimming} />;
      case "Tenis stołowy":
        return <Image src={pingpong} />;
      case "Wspinaczka":
        return <Image src={climbing} />;
      default:
        return <Image src={soccer} />;
    }
  }

  render() {
    let button = null;
    if (!this.state.joinned) {
      button = (
        <Link>
          <Button
            color="orange"
            disabled={
              this.state.actuallPartcipantNumber >=
              this.state.maxPartcipantNumber
            }
            onClick={this.joinEvent}
            loading={this.state.isLoading}
          >
            <Button.Content visible>Dołącz do wydarzenia</Button.Content>
          </Button>
        </Link>
      );
    } else {
      button = (
        <Link>
          <Button
            color="red"
            onClick={this.leaveEvent}
            loading={this.state.isLoading}
          >
            <Button.Content visible>Opuść wydarzenie</Button.Content>
          </Button>
        </Link>
      );
    }

    return (
      <Link to={`/eventView/${this.state.eventID}`}>
        <Grid divided>
          <GridRow>
            <GridColumn textAlign="center" verticalAlign="middle" width={2}>
              {this.renderSwitch(this.state.sportName)}
              <h4>{this.state.sportName}</h4>
            </GridColumn>
            <GridColumn verticalAlign="middle" width={3}>
              <h4>{this.state.eventTime}</h4>
              <h5>{this.state.eventDate}</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" width={4}>
              <h4>
                {this.state.actuallPartcipantNumber}/
                {this.state.maxPartcipantNumber}
              </h4>
              <h6>UCZESTNIKOW</h6>
              <Progress
                percent={
                  (this.state.actuallPartcipantNumber /
                    this.state.maxPartcipantNumber) *
                  100
                }
              />
            </GridColumn>
            <GridColumn verticalAlign="middle" width={4}>
              <h4>{this.state.placeName}</h4>
              <h4>{this.state.streetName + " " + this.state.streetNumber}</h4>
              <h4>{this.state.city}</h4>
            </GridColumn>
            <GridColumn textAlign="center" verticalAlign="middle" width={3}>
              {button}
            </GridColumn>
          </GridRow>
        </Grid>
      </Link>
    );
  }
}

export default EventAvaliable;