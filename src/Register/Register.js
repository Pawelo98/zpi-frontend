import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {
  Grid,
  Header,
  Segment,
  Item,
  Icon,
  Button,
  Checkbox,
} from "semantic-ui-react";
import { validation } from "./validationRules"
import userService from "../Api/Api";
import { notification, Input, Form } from "antd";
import "antd/dist/antd.less";
import "../index.css";
import Regulamin from "./Regulamin"
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../constants";
const FormItem = Form.Item;


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: {
        value: "",
      },
      password: {
        value: "",
      },
      email: {
        value: "",
      },
      name: {
        value: "",
      },
      surname: {
        value: "",
      },
      phoneNumber: {
        value: "",
      },
      confirmPassword: {
        value: "",
      },
      userAgreement: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(
      this
    );
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.toggleAgreement = this.toggleAgreement.bind(this);
    this.wrapper = React.createRef();
  }

  handleToggleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleCloseModal = () => {
    this.setState({
      open: false,
    });
  };

  toggleAgreement = () => {
    this.setState({
      userAgreement: !this.state.userAgreement,
    });
  };

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

  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      username: this.state.username.value,
      password: this.state.password.value,
      email: this.state.email.value,
      name: this.state.name.value,
      surname: this.state.surname.value,
      phoneNumber: this.state.phoneNumber.value,
    };
    userService
      .signup(signupRequest)
      .then((response) => {
        notification.success({
          message: "Login App",
          description:
            "Thank you! You're successfully registered. Please Login to continue!",
        });

      this.setState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        name: "",
        surname: "",
        phoneNumber: "",
      });

        //TODO
        //this.props.history.push("/login");
      })
      .catch((error) => {
        notification.error({
          message: "Login App",
          description:
            error.message || "Sorry! Something went wrong. Please try again!",
        });
      });
  }

  isFormInvalid() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.surname.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success" &&
      this.state.confirmPassword.validateStatus === "success" &&
      this.state.userAgreement === true
    );
  }

  render() {
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as="h2" color="orange" textAlign="center">
              Zarajestruj się !
            </Header>
            <Form onSubmit={this.onSubmit} autoComplete="off">
              <Segment stacked>
                <FormItem
                  style={{ marginBottom: 12 }}
                  hasFeedback
                  autoComplete="off"
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}
                >
                  <Input
                    prefix={<Icon name="user" />}
                    autoComplete="off"
                    name="username"
                    type="text"
                    value={this.state.username.value}
                    onBlur={this.validateUsernameAvailability}
                    placeholder="Username"
                    onChange={(event) =>
                      this.handleChange(event, validation.validateUsername)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  autoComplete="off"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}
                >
                  <Input.Password
                    prefix={<Icon name="lock" />}
                    autoComplete="off"
                    name="password"
                    placeholder="Hasło"
                    type="password"
                    value={this.state.password.value}
                    onChange={(event) =>
                      this.handleChange(event, this.validatePassword)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  validateStatus={this.state.confirmPassword.validateStatus}
                  help={this.state.confirmPassword.errorMsg}
                >
                  <Input.Password
                    prefix={<Icon name="lock" />}
                    autoComplete="off"
                    value={this.state.confirmPassword.value}
                    placeholder="Potwierdz hasło"
                    name="confirmPassword"
                    type="password"
                    onChange={(event) =>
                      this.handleChange(event, this.validateConfirmPassword)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}
                >
                  <Input
                    prefix={<Icon name="mail" />}
                    name="email"
                    placeholder="Adres e-mail"
                    onBlur={this.validateEmailAvailability}
                    value={this.state.email.value}
                    onChange={(event) =>
                      this.handleChange(event, validation.validateEmail)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}
                >
                  <Input
                    prefix={<Icon name="user" />}
                    autoComplete="off"
                    placeholder="Imię"
                    value={this.state.name.value}
                    name="name"
                    onChange={(event) =>
                      this.handleChange(event, validation.validateName)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  validateStatus={this.state.surname.validateStatus}
                  help={this.state.surname.errorMsg}
                >
                  <Input
                    prefix={<Icon name="user" />}
                    autoComplete="off"
                    placeholder="Nazwisko"
                    value={this.state.surname.value}
                    name="surname"
                    onChange={(event) =>
                      this.handleChange(event, validation.validateSurname)
                    }
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  style={{ marginBottom: 12 }}
                  validateStatus={this.state.phoneNumber.validateStatus}
                  help={this.state.phoneNumber.errorMsg}
                >
                  <Input
                    prefix={<Icon name="phone" />}
                    value={this.state.phoneNumber.value}
                    name="phoneNumber"
                    placeholder="Numer telefonu"
                    onChange={(event) =>
                      this.handleChange(event, validation.validatePhoneNumber)
                    }
                  />
                </FormItem>
                <FormItem>
                  <Checkbox
                    onChange={this.toggleAgreement}
                    label={
                      <label
                        style={{
                          "line-height": 16,
                        }}
                      >
                        Zapoznałem się z regulaminem i akceptuję wszystkie jego
                        postanowienia oraz zezwalam na przetwarzanie moich
                        danych osobowych do celów określonych w{" "}
                        <Item as={Link} onClick={this.handleToggleModal}>
                          regulaminie
                        </Item>
                      </label>
                    }
                  />
                </FormItem>

                <FormItem style={{ marginBottom: 6 }}>
                  <Button
                    color="orange"
                    size="large"
                    disabled={this.isFormInvalid()}
                    onClick={this.handleSubmit}
                  >
                    Stwórz konto
                  </Button>
                </FormItem>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Regulamin isOpen={this.state.open} onClose={this.handleToggleModal} />
      </div>
    );
  }

  validateUsernameAvailability() {
    const usernameValue = this.state.username.value;
    const usernameValidation = validation.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === "error") {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation,
        },
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: "validating",
        errorMsg: null,
      },
    });

    userService
      .checkUsernameAvailability(usernameValue)
      .then((response) => {
        if (response.available) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "success",
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "error",
              errorMsg: "Ta nazwa jest już zajęta",
            },
          });
        }
      })
      .catch((error) => {
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: "success",
            errorMsg: null,
          },
        });
      });
  }

  validateEmailAvailability() {
    const emailValue = this.state.email.value;
    const emailValidation = validation.validateEmail(emailValue);

    if (emailValidation.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation,
        },
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "validating",
        errorMsg: null,
      },
    });

    userService
      .checkEmailAvailability(emailValue)
      .then((response) => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "success",
              errorMsg: null,
            },
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "error",
              errorMsg: "Ten email jest już zajęty",
            },
          });
        }
      })
      .catch((error) => {
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null,
          },
        });
      });
  }

  validateConfirmPassword = (confirmPassword) => {
      if (confirmPassword !== this.state.password.value) {
        return {
          validateStatus: "error",
          errorMsg: `Hasła się nie zgadzają.`,
        };
      }
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  
validatePassword = (password) =>{
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Hasło jest za krótkie (Wymagane minimum to ${PASSWORD_MIN_LENGTH} znaki)`,
    };
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Hasło jest za długie (Maksimum to ${PASSWORD_MAX_LENGTH} znaków)`,
    };
  } else {
    const event = {
      target: {
        value: "",
        name: "confirmPassword",
      },
    };
    this.handleChange(event, this.validateConfirmPassword); 

    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
};
}

export default Register;