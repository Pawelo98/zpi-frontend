import React, { Component } from 'react';
import { Grid, GridColumn, Image, GridRow } from 'semantic-ui-react';
import LoadingIndicator from "../common/LoadingIndicator";
import { Link } from "react-router-dom";
import { eventService } from '../Api/Api';
import badmintonSingle from "../Icons/greyScale/badmintonSingleGrey.svg";
import badmintonDouble from "../Icons/greyScale/badmintonDoubleGrey.svg";
import basketball from "../Icons/greyScale/basketballGrey.svg";
import climbing from "../Icons/greyScale/climbingGrey.svg";
import cycling from "../Icons/greyScale/cyclingGrey.svg";
import handball from "../Icons/greyScale/handballGrey.svg";
import indoor from "../Icons/greyScale/indoorGrey.svg";
import pingpong from "../Icons/greyScale/pingpongGrey.svg";
import running from "../Icons/greyScale/runningGrey.svg";
import soccer from "../Icons/greyScale/soccerGrey.svg";
import squash from "../Icons/greyScale/squashGrey.svg";
import swimming from "../Icons/greyScale/swimmingGrey.svg";
import tennisDouble from "../Icons/greyScale/tennisDoubleGrey.svg";
import tennisSingle from "../Icons/greyScale/tennisSingleGrey.svg";
import volleyball from "../Icons/greyScale/volleyballGrey.svg";

class PassedEvent extends Component {
  constructor(propos) {
    super(propos);

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
    };
  }

  componentDidMount() {
    if (this.props.dataFromParent.eventID !== undefined) {
      eventService
        .countEventParticipants(this.props.dataFromParent.eventID)
        .then((response) => {
          this.setState({
            eventID: this.props.dataFromParent.eventID,
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
    if (this.props.isLoading) {
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
            <GridColumn verticalAlign="middle" width={6}>
              <h4>{this.props.dataFromParent.eventTime}</h4>
              <h5>{this.props.dataFromParent.eventDate}</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" width={6}>
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

export default PassedEvent;