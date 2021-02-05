import React from "react";
import { Steps, notification } from "antd";
import { Grid, Button } from "semantic-ui-react";
import EventGeneralInfo from "./EventGeneralInfo"
import EventLocationTime from "./EventLocationTime";
import EventSumUp from "./EventSumUp";
import { eventPlaceService, sportCategoryService, eventService } from "../Api/Api";
import { USER } from "../constants";

const { Step } = Steps;

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            isValidated: true,
            eventName: {
                value: "",
            },
            eventDescription: {
                value: "",
            },
            eventMaxPlayers: {
                value: "",
            },
            sportCategory: {
                value: "",
            },
            eventPlace: {
                value: "",
            },
            isCyclic: {
                value: true,
            },
            eventCyclicity: {
                value: "",
            },
            eventDate: {
                value: "",
            },
            eventTime: {
                value: "",
            },
            eventDuration: {
                value: "",
            },
            eventCity: {
                value: "",
            },
            userAgreement: false,
            eventPlaces: [],
            sportCategories: [],
            cyclics: []
        };
        this.isStepDetailsInvalid = this.isStepDetailsInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSportCategory = this.handleChangeSportCategory.bind(this);
        this.toggleAgreement = this.toggleAgreement.bind(this);
        this.handleChangeCalendar = this.handleChangeCalendar.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.wrapper = React.createRef();
    }

    componentDidMount () {
        this.loadSportCategories();
        this.loadCyclics();
    }

    loadEventPlaces (sportCategoryId, eventCity) {
        eventPlaceService
            .getEventPlaces(sportCategoryId, eventCity)
            .then((response) => {
                console.log(response);
                this.setState({
                    eventPlaces: response,        
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    loadSportCategories () {
        sportCategoryService
            .getAllSportsCat()
            .then((response) => {
                this.setState({
                    sportCategories: response,
                    sportCategory: {
                        value: ""
                    }
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    loadCyclics () {
        eventPlaceService
            .getCyclics()
            .then((response) => {
                this.setState({
                    cyclics: response
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true
                    });
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            });
    }

    getStepContent (stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <EventGeneralInfo
                        eventName={this.state.eventName}
                        eventDescription={this.state.eventDescription}
                        eventMaxPlayers={this.state.eventMaxPlayers}
                        sportCategory={this.state.sportCategory}
                        eventPlace={this.state.eventPlace}
                        eventPlaces={this.state.eventPlaces}
                        sportCategories={this.state.sportCategories}
                        eventCity={this.state.eventCity}
                        onChange={this.handleChange}
                        onChangeSportCategory={this.handleChangeSportCategory}
                    />
                );
            case 1:
                return (
                    <EventLocationTime
                        isCyclic={this.state.isCyclic}
                        eventCyclicity={this.state.eventCyclicity}
                        eventDate={this.state.eventDate}
                        eventTime={this.state.eventTime}
                        eventDuration={this.state.eventDuration}
                        cyclics={this.state.cyclics}
                        onChange={this.handleChange}
                        onChangeCalendar={this.handleChangeCalendar}
                        onChangeDate={this.handleChangeDate}
                    />
                );
            case 2:
                return (
                    <EventSumUp
                        eventName={this.state.eventName}
                        eventDescription={this.state.eventDescription}
                        sportCategory={this.state.sportCategory}
                        eventPlace={this.state.eventPlace}
                        eventDate={this.state.eventDate}
                        eventTime={this.state.eventTime}
                        toggleAgreement={this.toggleAgreement}
                    />
                );
            default:
                return "You're a long way from home sonny jim!";
        }
    }

    handleSubmit () {
        var changedDate = this.state.eventDate.value.substr(6, 4) + "-" + this.state.eventDate.value.substr(3, 2) + "-" + this.state.eventDate.value.substr(0, 2);

        const newEventRequest = {
            cycleId: this.state.eventCyclicity.value,
            eventPlaceId: this.state.eventPlace.value,
            sportCategoryId: this.state.sportCategory.value,
            eventName: this.state.eventName.value,
            eventDescription: this.state.eventDescription.value,
            eventDate: changedDate,
            eventTime: this.state.eventTime.value + ":00",
            maxPlayers: parseInt(this.state.eventMaxPlayers.value),
            isCyclic: this.state.isCyclic.value,
            eventDuration: this.state.eventDuration.value
        };
        console.log(newEventRequest);
        eventService
            .newEvent(newEventRequest)
            .then((response) => {
                notification.success({
                    message: "New event",
                    description:
                        "Thank you! Event created! Notify your friends about your event!",
                });

                this.setState({
                    eventName: "",
                    eventDescription: "",
                    eventMaxPlayers: "",
                    sportCategory: "",
                    eventPlace: "",
                    isCyclic: "",
                    eventCyclicity: "",
                    eventDate: "",
                    eventTime: "",
                    eventDuration: ""
                });

                const user = JSON.parse(localStorage.getItem(USER).toString());

                this.props.history.push(`/mainProfilePage/${user.username}`);
            })
            .catch((error) => {
                notification.error({
                    message: "New event",
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

    handleChange (event, validationFunction) {
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

    handleChangeCalendar (event, { name, value }, validationFunction) {
        this.setState({
            [name]: {
                value,
                ...validationFunction(value)
            }
        });
    }

    handleChangeDate (event, { name, value }, validationFunction) {
        this.setState({
            [name]: {
                value,
                ...validationFunction(value, this.state.eventDate.value)
            }
        });
    }

    handleChangeSportCategory (event, validationFunction) {
        const target = event.target;
        const inputValue = target.value;
        const inputName = target.name;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFunction(inputValue),
            },
        });

        this.loadEventPlaces(inputValue, this.state.eventCity.value);
    }

    isStepDetailsInvalid () {
        return !(
            this.state.eventName.validateStatus === "success" &&
            this.state.eventDescription.validateStatus === "success" &&
            this.state.eventMaxPlayers.validateStatus === "success" &&
            this.state.sportCategory.validateStatus === "success" &&
            this.state.eventPlace.validateStatus === "success"
        );
    }

    isStepLocationInvalid () {
        return !(
            this.state.eventDate.validateStatus === "success" &&
            this.state.eventTime.validateStatus === "success" &&
            this.state.eventDuration.validateStatus === "success"
        );
    }

    isStepSumUpInvalid () {
        return !(this.state.userAgreement === true);
    }

    setStatus (validationFunction, number) {
        if (number > this.state.current) {
            return "wait";
        }
        if (validationFunction) {
            return "finish";
        } else {
            return "error";
        }
    }

    prev () {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    next () {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    render () {
        const { current } = this.state;
        const steps = [
            {
                title: "Nazwa i opis",
                content: "First-content",
                status: "process",
                validateStatus: this.isStepDetailsInvalid(),
            },
            {
                title: "Czas i lokalizacja",
                content: "Second-content",
                status: "wait",
                validateStatus: this.isStepLocationInvalid(),
            },
            {
                title: "Potwierdzenie",
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
                                Stwórz wydarzenie
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
export default EventForm;