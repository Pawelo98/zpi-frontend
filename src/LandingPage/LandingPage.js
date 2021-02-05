import React, { Component } from "react";
import {
  Button,
  Label,
  Grid,
  Segment,
  Container,
  Image
} from "semantic-ui-react";
import { notification } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { withRouter } from 'react-router-dom';
import main from "../main.svg"

class LandingPage extends Component {
  constructor(props) {
    super(props);
    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3,
    });
  }


  render () {
    var sliderMainSettings = {
      dots: false,
      speed: 1000,
      slidesToShow: 1,
      draggable: false,
      focusOnSelect: true,
      infinite: false,
      afterChange: () =>
        this.setState((state) => ({ updateCount: state.updateCount + 1 })),
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
    };

    return (
      <Container>
        <Grid stackable textAlign="center" verticalAlign="middle">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={main} />
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Slider
                {...sliderMainSettings}
                ref={(slider) => (this.slider = slider)}
              >
                <div>
                  <Login onLogin={this.props.onLogin} />
                </div>
                <div>
                  <Register />
                </div>
                <div>
                  <Segment>
                    <Label attached="top">Informacje</Label>
                    <Container textAlign="center">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus nunc ipsum, consequat dictum est at, lobortis
                        viverra nisl. Maecenas facilisis, sapien nec
                        sollicitudin lacinia, tellus ex rutrum nulla, a egestas
                        justo mi non mi.
                      </p>
                    </Container>
                  </Segment>
                  <Segment>
                    <Label attached="top center">Dodatkowe</Label>
                    <Container textAlign="center">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus nunc ipsum, consequat dictum est at, lobortis
                        viverra nisl. Maecenas facilisis, sapien nec
                        sollicitudin lacinia, tellus ex rutrum nulla, a egestas
                        justo mi non mi.
                      </p>
                    </Container>
                  </Segment>
                </div>
              </Slider>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3} style={{ maxWidth: 450 }}>
            <Grid.Column>
              <Button
                icon="sign-in"
                size="big"
                color="orange"
                onClick={(e) => this.slider.slickGoTo(0)}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                size="big"
                color="orange"
                onClick={(e) => this.slider.slickGoTo(1)}
              >
                JOIN
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                icon="info"
                size="big"
                color="orange"
                onClick={(e) => this.slider.slickGoTo(2)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(LandingPage);