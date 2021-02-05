import React from "react";
import { Steps, notification } from "antd";
import { Grid, Button } from "semantic-ui-react";
import EventPlaceDetailsForm from "./EventPlaceDetailsForm"
import EventPlaceLocationForm from "./EventPlaceLocationForm";
import EventPlaceSumUpForm from "./EventPlaceSumUpForm";
import { eventPlaceService } from "../Api/Api";
import { USER } from "../constants";

const { Step } = Steps;



class EventPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isValidated: true,
      eventPlaceName: {
        value: "",
      },
      eventPlaceDescription: {
        value: "",
      },
      eventPlaceCity: {
        value: "",
      },
      eventPlacePostalCode: {
        value: "",
      },
      eventPlaceStreet: {
        value: "",
      },
      eventPlaceStreetNumber: {
        value: "",
      },
      sportsCategory: [],
      userAgreement: false,
    };
    this.isStepDetailsInvalid = this.isStepDetailsInvalid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgreement = this.toggleAgreement.bind(this);
    this.wrapper = React.createRef();
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <EventPlaceDetailsForm
            eventPlaceName={this.state.eventPlaceName}
            sportsCategory={this.state.sportsCategory}
            handleToggle={this.handleToggle}
            eventPlaceDescription={this.state.eventPlaceDescription}
            onChange={this.handleChange}
          />
        );
      case 1:
        return (
          <EventPlaceLocationForm
            eventPlaceCity={this.state.eventPlaceCity}
            eventPlacePostalCode={this.state.eventPlacePostalCode}
            eventPlaceStreet={this.state.eventPlaceStreet}
            eventPlaceStreetNumber={this.state.eventPlaceStreetNumber}
            onChange={this.handleChange}
          />
        );
      case 2:
        return (
          <EventPlaceSumUpForm
            eventPlaceName={this.state.eventPlaceName.value}
            sportsCategory={this.state.sportsCategory}
            eventPlaceDescription={this.state.eventPlaceDescription.value}
            eventPlaceCity={this.state.eventPlaceCity.value}
            eventPlacePostalCode={this.state.eventPlacePostalCode.value}
            eventPlaceStreet={this.state.eventPlaceStreet.value}
            eventPlaceStreetNumber={this.state.eventPlaceStreetNumber.value}
            toggleAgreement={this.toggleAgreement}
          />
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  handleSubmit() {
    const newEventPlaceRequest = {
      eventPlaceName: this.state.eventPlaceName.value,
      eventPlaceDescription: this.state.eventPlaceDescription.value,
      sportsCategory: this.state.sportsCategory,
      eventPlaceCity: this.state.eventPlaceCity.value,
      eventPlacePostalCode: this.state.eventPlacePostalCode.value,
      eventPlaceStreet: this.state.eventPlaceStreet.value,
      eventPlaceStreetNumber: this.state.eventPlaceStreetNumber.value,
    };
    eventPlaceService
      .newEventPlace(newEventPlaceRequest)
      .then((response) => {
        notification.success({
          message: "New event place",
          description:
            "Thank you! Your new event place proposition has been sent. Wait for acceptance.",
        });

        this.setState({
          eventPlaceName: "",
          eventPlaceDescription: "",
          sportsCategory: "",
          eventPlaceCity: "",
          eventPlacePostalCode: "",
          eventPlaceStreet: "",
          eventPlaceStreetNumber: "",
        });

        const user =  JSON.parse(localStorage.getItem(USER).toString());

        this.props.history.push(`/mainProfilePage/${user.username}`);
      })
      .catch((error) => {
        notification.error({
          message: "New event place",
          description:
            error.message || "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  toggleAgreement = () => {
    this.setState({
      userAgreement: !this.state.userAgreement,
    });
  };

  handleToggle = (event, sportsCategory) => this.setState({ sportsCategory });

  handleChange(event, validationFunction) {
    const target = event.target;
    const inputValue = target.value;
    const inputName = target.name;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFunction(inputValue),
      },
    });
  }

  isStepDetailsInvalid() {
    return !(
      this.state.eventPlaceName.validateStatus === "success" &&
      this.state.eventPlaceDescription.validateStatus === "success" &&
      this.state.sportsCategory &&
      this.state.sportsCategory.length > 0
    );
  }

  isStepLocationInvalid() {
    return !(
      this.state.eventPlaceCity.validateStatus === "success" &&
      this.state.eventPlacePostalCode.validateStatus === "success" &&
      this.state.eventPlaceStreet.validateStatus === "success" &&
      this.state.eventPlaceStreetNumber.validateStatus === "success"
    );
  }

  isStepSumUpInvalid() {
    return !(this.state.userAgreement === true);
  }

  setStatus(validationFunction, number) {
    if (number > this.state.current) {
      return "wait";
    }
    if (validationFunction) {
      return "finish";
    } else {
      return "error";
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const steps = [
      {
        title: "Wprowadź dane",
        content: "First-content",
        status: "process",
        validateStatus: this.isStepDetailsInvalid(),
      },
      {
        title: "Podaj lokalizację",
        content: "Second-content",
        status: "wait",
        validateStatus: this.isStepLocationInvalid(),
      },
      {
        title: "Zatwierdź",
        content: "Last-content",
        status: "wait",
        validateStatus: this.isStepSumUpInvalid(),
      },
    ];

    return (
      <Grid centered stackable columns={1}>
        <Grid.Column mobile={16} tablet={8} computer={12}>
          <Steps className="custome-step" current={this.state.current}>
            <Step
              title={steps[0].title}
              status={
                0 < this.state.current
                  ? "finish"
                  : this.setStatus(!this.isStepDetailsInvalid(), 0)
              }
            />
            <Step
              title={steps[1].title}
              status={
                1 < this.state.current
                  ? "finish"
                  : this.setStatus(!this.isStepLocationInvalid(), 1)
              }
            />
            <Step
              title={steps[2].title}
              status={
                2 < this.state.current
                  ? "finish"
                  : this.setStatus(!this.isStepSumUpInvalid(), 2)
              }
            />
          </Steps>

          <div className="steps-content">{this.getStepContent(current)}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button
                color="orange"
                disabled={steps[current].validateStatus}
                onClick={() => this.next()}
              >
                Następny krok
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                disabled={steps[current].validateStatus}
                color="orange"
                onClick={this.handleSubmit}
              >
                Zgłoś obiekt
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                Poprzedni krok
              </Button>
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}
export default EventPlaceForm;