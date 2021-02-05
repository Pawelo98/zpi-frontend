import React from "react";
import { Steps, notification } from "antd";
import { Grid, Button } from "semantic-ui-react";
import EventEditionGeneralInfo from "./EventEditionGeneralInfo"
import EventEditionLocationTime from "./EventEditionLocationTime";
import EventEditionSumUp from "./EventEditionSumUp";
import { eventPlaceService, sportCategoryService, eventService, eventViewService } from "../Api/Api";
import LoadingIndicator from "../common/LoadingIndicator";

const { Step } = Steps;

class EventEditionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            isValidated: true,
            eventName: {
                value: ""
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
            cyclics: [],
            isLoading: true
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
        this.loadCyclics();
    }


    loadEventData () {
        const eventID = this.props.match.params.eventID;
        if (eventID !== undefined) {
            eventViewService
                .getEventInfo(eventID)
                .then((response) => {
                    console.log(response)

                    let date = response.eventDate;
                    let dateParts = date.split('-');
                    let dateInGoodFormat = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

                    let time = response.eventTime;
                    let timeParts = time.split(':');
                    let timeInGoodFormat = timeParts[0] + ":" + timeParts[1];
                    let isCyclic = response.isCyclic === 0 ? false : true;
                    this.setState({
                        eventName: {
                            value: response.eventName,
                            validateStatus: "success"
                        },
                        eventDescription: {
                            value: response.eventDescription,
                            validateStatus: "success"
                        },
                        eventMaxPlayers: {
                            value: response.maxPlayers,
                            validateStatus: "success"
                        },
                        eventCity: {
                            value: response.eventPlaceCity,
                            validateStatus: "success"
                        },
                        sportCategory: {
                            value: response.eventSportID,
                            validateStatus: "success"
                        },
                        isCyclic: {
                            value: isCyclic,
                            validateStatus: "success"
                        },
                        eventCyclicity: {
                            value: response.cycleId,
                            validateStatus: "success"
                        },
                        eventDate: {
                            value: dateInGoodFormat,
                            validateStatus: "success"
                        },
                        eventTime: {
                            value: timeInGoodFormat,
                            validateStatus: "success"
                        },
                        eventDuration: {
                            value: response.eventDuration,
                            validateStatus: "success"
                        },
                        eventPlace: {
                            value: response.eventPlaceID,
                            validateStatus: "success"
                        }
                    });
                })
                .catch((error) => {
                    if (error.status === 404) {
                        this.setState({
                            actuallPartcipantNumber: 1
                        });
                    } else {
                        this.setState({
                            actuallPartcipantNumber: 1
                        });
                    }
                })
                .then(() => this.loadEventPlaces(this.state.sportCategory.value, this.state.eventCity.value));
        }
    }

    loadEventPlaces (sportCategoryId, eventCity) {
        eventPlaceService
            .getEventPlaces(sportCategoryId, eventCity)
            .then((response) => {
                console.log(response);
                this.setState({
                    eventPlaces: response,
                    isLoading: false
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
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
            }).then(() => this.loadEventData())
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    loadCyclics () {
        eventPlaceService
            .getCyclics()
            .then((response) => {
                this.setState({
                    cyclics: response,
                });
            }).then(() => this.loadSportCategories())
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    getStepContent (stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <EventEditionGeneralInfo
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
                    <EventEditionLocationTime
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
                    <EventEditionSumUp
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

        const eventEditRequest = {
            eventId: parseInt(this.props.match.params.eventID),
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
        eventService
            .updateEvent(eventEditRequest)
            .then((response) => {
                notification.success({
                    message: "Event updated",
                    description:
                        "Dane wydarzenia zostały zmienione! Lepiej poinformuj innych uczestników!",
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

                this.props.history.push(`/eventView/${this.props.match.params.eventID}`);
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

        if (inputName === "eventCity") {
            this.loadEventPlaces(this.state.sportCategory.value, inputValue);
        }
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

        if (this.state.isLoading) {
            return <LoadingIndicator />;
        } else
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
                                    Edytuj wydarzenie
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
export default EventEditionForm;