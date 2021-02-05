import React, { Component } from 'react';
import { Grid, GridColumn, Image, Progress, GridRow } from 'semantic-ui-react';
import { eventService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
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


class CommingEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventID: this.props.dataFromParent.eventID,
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
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.props.dataFromParent.eventID !== undefined) {
      eventService
        .countEventParticipants(this.props.dataFromParent.eventID)
        .then((response) => {
          this.setState({
            isLoading: false,
            eventID: this.props.dataFromParent.eventID,
            actuallPartcipantNumber: response,
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              isLoading: false,
              actuallPartcipantNumber: 1,
            });
          } else {
            this.setState({
              isLoading: false,
              actuallPartcipantNumber: 1,
            });
          }
        });
    }
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
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    
    return (
      <Link to={`/eventView/${this.state.eventID}`}>
        <Grid divided>
          <GridRow>
            <GridColumn verticalAlign="middle" width={4}>
              {this.renderSwitch(this.props.dataFromParent.eventSportName)}
              <h4>{this.props.dataFromParent.eventSportName}</h4>
            </GridColumn>
            <GridColumn verticalAlign="middle" width={4}>
              <h4>{this.props.dataFromParent.eventTime}</h4>
              <h5>{this.props.dataFromParent.eventDate}</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" width={4}>
              <h4>
                {this.state.actuallPartcipantNumber}/
                {this.props.dataFromParent.maxPlayers}
              </h4>
              <h6>UCZESTNIKOW</h6>
              <Progress
                percent={
                  (this.state.actuallPartcipantNumber /
                    this.props.dataFromParent.maxPlayers) *
                  100
                }
              />
            </GridColumn>
            <GridColumn verticalAlign="middle" width={4}>
              <h4>{this.props.dataFromParent.eventPlaceName}</h4>
              <h4>
                {this.props.dataFromParent.eventPlaceStreetName +
                  " " +
                  this.props.dataFromParent.eventPlaceStreetNumber}
              </h4>
              <h4>{this.props.dataFromParent.eventPlaceCity}</h4>
            </GridColumn>
          </GridRow>
        </Grid>
      </Link>
    );
  }
}

export default CommingEvent;