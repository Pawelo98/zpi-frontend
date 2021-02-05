import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Link, Route } from "react-router-dom";
import MainProfilePage from "../MainProfilePage";


class Participant extends Component {
    constructor(props) {
      super(props);

      this.state = {
          image: "https://react.semantic-ui.com/images/wireframe/image.png",
          username: "",
          name: "Maciej"
      }
    }

    componentDidMount() {
        this.setState({
            username: this.props.dataFromParent.username,
            name: this.props.dataFromParent.name
        })
    }

    render() {
        return(
            <div>
                <Link to={`/mainProfilePage/${this.state.username}`} >
                    <Image
                        src={this.state.image}
                        size='medium'
                        label={{content: this.state.name, attached: 'bottom', size: 'medium'}}
                    />
                </Link>
                <Route
                    path="/mainProfilePage/:username"
                    render={(props) => (
                    <MainProfilePage
                        isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.username}
                        {...props}
                    />
                )}
                ></Route>
            </div>
           
        )
    }
}

export default Participant;