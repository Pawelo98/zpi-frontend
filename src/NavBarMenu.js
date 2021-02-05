import React, { Component } from "react";
import { Menu } from 'semantic-ui-react';
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import MainProfilePage from "./MainProfilePage";
import LandingPage from "./LandingPage/LandingPage";
import SearchView from "./SearchView/SearchView";
import EventPlaceForm from "./EventPlace/EventPlaceForm";
import {
  notification,
} from "antd";
import userService from "./Api/Api";
import { ACCESS_TOKEN, USER, USER_IMAGE } from "./constants";
import Drawer from "./Drawer";
import EventView from "./EventDetailView/EventView";
import UserOpinionsPage from "./OpinionsPage/UserOpinionsPage";
import PlaceOpinionForm from "./PlaceOpinion/PlaceOpinionForm";
import NewEventPlaceAccept from "./AdminPanel/EventPlaceAcceptingPanel/NewEventPlaceAccept";
import EventForm from "./EventForm/EventForm";
import EventEditionForm from "./EventEditionForm/EventEditionForm";

class NavBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      collapsed: false,
      userAuthorities: [],
    };
    this.wrapper = React.createRef();

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCheckAuthority = this.handleCheckAuthority.bind(this);

    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3,
    }); 
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogin () {
    notification.success({
      message: "Login App",
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
  }

  handleCheckAuthority () {
    return this.state.userAuthorities.some(
      (e) => e.authority === "ROLE_ADMIN"
    );
  };

  loadCurrentUser () {
    this.setState({
      isLoading: true,
    });
    userService
      .getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false,
          userAuthorities: response.authorities
        });
        this.props.history.push(`/mainProfilePage/${response.username}`);
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push(`/home`);
      });
  }

  componentDidMount () {
    this.loadCurrentUser();
  }

  handleLogout () {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(USER_IMAGE);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });

    this.props.history.push("/home");

    notification["success"]({
      message: "Login App",
      description: "You're successfully logged out.",
    });
  }


  render () {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Menu pointing />
          <Switch>
            <Route
              path="/mainProfilePage/:username"
              render={(props) => (
                <MainProfilePage
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  {...props}
                />
              )}
            ></Route>
            <Route path="/searchPannel">
              <SearchView />
            </Route>
            <Route
              path="/home"
              render={(props) => (
                <LandingPage onLogin={this.handleLogin} {...props} />
              )}
            ></Route>
          </Switch>
        </div>
      );
    }

    return (
      <div>
        <Drawer
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          authorities={this.handleCheckAuthority()}
          onLogout={this.handleLogout}
        />
        <div>
          <Switch>
            <Route
              path="/mainProfilePage/:username"
              render={(props) => (
                <MainProfilePage
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  {...props}
                />
              )}
            ></Route>
            <Route path="/searchPannel">
              <SearchView />
            </Route>
            <Route
              path="/home"
              render={(props) => (
                <LandingPage onLogin={this.handleLogin} {...props} />
              )}
            ></Route>
            <Route
              path="/eventView/:eventID"
              render={(props) => <EventView {...props} currentUser={this.state.currentUser}/>}
            ></Route>
            <Route
              path="/addNewEventPlace"
              render={(props) => <EventPlaceForm {...props} />}
            ></Route>
            <Route
              path="/addNewEvent"
              render={(props) => <EventForm {...props} />}
            ></Route>
             <Route
              path="/editEvent/:eventID"
              render={(props) => <EventEditionForm {...props} />}
            ></Route>
            <Route
              path="/useropinions/:username"
              render={(props) => <UserOpinionsPage {...props} currentUser={this.state.currentUser}/>}
            ></Route>
            <Route
              path="/eventplaceopinonform/:eventPlaceID"
              render={(props) => <PlaceOpinionForm {...props} />}
            ></Route>

            {this.handleCheckAuthority() ? (
              <Route
                path="/newEventPlaceAccept"
                render={(props) => <NewEventPlaceAccept {...props} />}
              ></Route>
            ) : (
                <React.Fragment />
              )}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBarMenu);