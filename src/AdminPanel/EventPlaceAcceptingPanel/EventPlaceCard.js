import React, { Component } from "react";
import {
  Grid,
  GridColumn,
  GridRow,
  Button,
} from "semantic-ui-react";
import { eventPlaceService } from "../../Api/Api"
import { notification } from "antd";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { grey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import badmintonSingle from "../../Icons/greyScale/badmintonSingleGrey.svg";
import badmintonDouble from "../../Icons/greyScale/badmintonDoubleGrey.svg";
import basketball from "../../Icons/greyScale/basketballGrey.svg";
import climbing from "../../Icons/greyScale/climbingGrey.svg";
import cycling from "../../Icons/greyScale/cyclingGrey.svg";
import handball from "../../Icons/greyScale/handballGrey.svg";
import indoor from "../../Icons/greyScale/indoorGrey.svg";
import pingpong from "../../Icons/greyScale/pingpongGrey.svg";
import running from "../../Icons/greyScale/runningGrey.svg";
import soccer from "../../Icons/greyScale/soccerGrey.svg";
import squash from "../../Icons/greyScale/squashGrey.svg";
import swimming from "../../Icons/greyScale/swimmingGrey.svg";
import tennisDouble from "../../Icons/greyScale/tennisDoubleGrey.svg";
import tennisSingle from "../../Icons/greyScale/tennisSingleGrey.svg";
import volleyball from "../../Icons/greyScale/volleyballGrey.svg";
import Tooltip from "@material-ui/core/Tooltip";

const GreySwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: grey[600],
    },
    "&$checked + $track": {
      backgroundColor: grey[600],
    },
  },
  checked: {},
  track: {},
})(Switch);

const toggleSportsCategories = [
  {
    value: "1",
    icon: soccer,
    tooltip: "Piłka nożna",
  },
  {
    value: "2",
    icon: volleyball,
    tooltip: "Siatkówka",
  },
  {
    value: "3",
    icon: basketball,
    tooltip: "Koszykówka",
  },
  {
    value: "4",
    icon: indoor,
    tooltip: "Piłka halowa",
  },
  {
    value: "6",
    icon: tennisSingle,
    tooltip: "Tenis ziemny - single",
  },
  {
    value: "7",
    icon: tennisDouble,
    tooltip: "Tenis ziemny - debel",
  },
  {
    value: "8",
    icon: squash,
    tooltip: "Squash",
  },
  {
    value: "5",
    icon: handball,
    tooltip: "Piłka ręczna",
  },
  {
    value: "9",
    icon: badmintonSingle,
    tooltip: "Badminton - single",
  },
  {
    value: "10",
    icon: badmintonDouble,
    additional: "x2",
    tooltip: "Badminton - debel",
  },
  {
    value: "11",
    icon: running,
    tooltip: "Bieganie",
  },
  {
    value: "12",
    icon: cycling,
    tooltip: "Kolarstwo",
  },
  {
    value: "13",
    icon: swimming,
    tooltip: "Pływanie",
  },
  {
    value: "14",
    icon: pingpong,
    tooltip: "Tenis stołowy",
  },
  {
    value: "15",
    icon: climbing,
    tooltip: "Wspinaczka",
  },
];



class EventPlaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPlaceID: 0,
      eventPlaceName: "Undefined",
      eventPlaceDescription: "Undefined",
      eventPlaceStreetName: "Undefined",
      eventPlaceStreetNumber: "Undefined",
      eventPlacePostCode: "Undefined",
      eventPlaceCity: "Undefined",
      eventPlaceSportsCategories: [{ sportsCategoryId: 1 }],
      userRequestingID: null,
      userRequestingUsername: "Undefined",
      userAcceptingID: null,
      userAcceptingUsername: "Undefined",
      isAccepted: false,
      isArchived: false,
      joinned: false,
      isLoading: false,
    };
    this.handleAcceptEventPlace = this.handleAcceptEventPlace.bind(this);
    this.handleToggleArchiveEventPlace = this.handleToggleArchiveEventPlace.bind(this);
  }


  handleToggleArchiveEventPlace () {
    eventPlaceService
      .archiveEventPlace(this.state.eventPlaceID, this.state.isArchived)
      .then((response) => {
        notification.success({
          message: "Event place archive status",
          description: "Thank you! Event place status has been changed.",
        });

        this.setState({
          isArchived: !this.state.isArchived,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Archived event place",
          description:
            error.message || "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  handleAcceptEventPlace () {
    eventPlaceService
      .acceptEventPlace(this.state.eventPlaceID)
      .then((response) => {
        notification.success({
          message: "Accepted new event place",
          description: "Thank you! Event place has been accepted.",
        });

        this.setState({
          isAccepted: response.isAccepted,
          userAcceptingUsername: response.userAcceptingUsername,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Accept event place",
          description:
            error.message || "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  componentDidMount () {
    this.setState({
      eventPlaceID: this.props.eventPlaceDetails.eventPlaceID,
      eventPlaceName: this.props.eventPlaceDetails.eventPlaceName,
      eventPlaceDescription: this.props.eventPlaceDetails.eventPlaceDescription,
      eventPlaceStreetName: this.props.eventPlaceDetails.eventPlaceStreetName,
      eventPlaceStreetNumber: this.props.eventPlaceDetails
        .eventPlaceStreetNumber,
      eventPlacePostCode: this.props.eventPlaceDetails.eventPlacePostCode,
      eventPlaceCity: this.props.eventPlaceDetails.eventPlaceCity,
      eventPlaceSportsCategories: this.props.eventPlaceDetails.sportsCategories,
      userRequestingUsername: this.props.eventPlaceDetails
        .userRequestingUsername,
      userAcceptingUsername: this.props.eventPlaceDetails.userAcceptingUsername,
      isAccepted: this.props.eventPlaceDetails.isAccepted,
      isArchived: this.props.eventPlaceDetails.isArchived,
    });
  }

  render () {
    return (
      <Grid divided>
        <GridRow
          style={
            this.state.isArchived
              ? { backgroundColor: "#EDEDED", color: "#EDEDED" }
              : {}
          }
        >
          <GridColumn
            textAlign="center"
            verticalAlign="top"
            mobile={2}
            tablet={2}
            computer={1}
          >
            <h4 style={{ fontWeight: "bold" }}>ID:</h4>
            <h4>{this.state.eventPlaceID}</h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" mobile={6} tablet={4} computer={3}>
            <h4 style={{ fontWeight: "bold" }}>Nazwa obiektu:</h4>
            <h4>{this.state.eventPlaceName}</h4>
            <h4 style={{ fontWeight: "bold" }}>Opis:</h4>
            <h4>{this.state.eventPlaceDescription}</h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" mobile={6} tablet={4} computer={3}>
            <h4 style={{ fontWeight: "bold" }}>Miasto:</h4>
            <h4>
              {this.state.eventPlaceCity} {this.state.eventPlacePostCode}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>Ulica/Numer:</h4>
            <h4>
              {this.state.eventPlaceStreetName}{" "}
              {this.state.eventPlaceStreetNumber}
            </h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" mobile={6} tablet={4} computer={3}>
            <h4 style={{ fontWeight: "bold" }}>Zgłaszający:</h4>
            <h4>{this.state.userRequestingUsername}</h4>
            <h4 style={{ fontWeight: "bold" }}>Zaakceptował:</h4>
            <h4>{this.state.userAcceptingUsername}</h4>
            <h4 style={{ fontWeight: "bold" }}>
              Zaakceptowane: {this.state.isAccepted ? "Tak" : "Nie"}
            </h4>
            <h4 style={{ fontWeight: "bold" }}>
              Zarchiwizowane: {this.state.isArchived ? "Tak" : "Nie"}
            </h4>
          </GridColumn>
          <GridColumn verticalAlign="middle" mobile={4} tablet={3} computer={2}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "flex-start",
              }}
            >
              {this.state.eventPlaceSportsCategories.map((item) => (
                <React.Fragment>
                  <Tooltip
                    title={
                      toggleSportsCategories[item.sportsCategoryId - 1].tooltip
                    }
                  >
                    <img
                      height="30"
                      width="30"
                      src={
                        toggleSportsCategories[item.sportsCategoryId - 1].icon
                      }
                      alt=""
                    />
                  </Tooltip>
                </React.Fragment>
              ))}
            </div>
          </GridColumn>

          <GridColumn
            centered="true"
            textAlign="center"
            verticalAlign="middle"
            mobile={4}
            tablet={4}
            computer={2}
            padding={2}
          >
            <Grid.Row>
              {this.state.isAccepted ? (
                <Button
                  color="grey"
                  size="small"
                  disabled={this.state.isAccepted}
                >
                  <Button.Content visible>Zatwierdź propozycję</Button.Content>
                </Button>
              ) : (
                  <Button
                    positive
                    size="small"
                    disabled={this.state.isAccepted}
                    onClick={this.handleAcceptEventPlace}
                  >
                    <Button.Content visible>Zatwierdź propozycję</Button.Content>
                  </Button>
                )}
            </Grid.Row>
            <Grid.Row>
              <FormControlLabel
                color="black"
                disabled={!this.state.isAccepted}
                control={
                  <GreySwitch
                    color="grey"
                    checked={this.state.isArchived}
                    onChange={this.handleToggleArchiveEventPlace}
                  />
                }
                label={<Typography color="textPrimary">Archiwizuj</Typography>}
              />
            </Grid.Row>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

export default EventPlaceCard;
