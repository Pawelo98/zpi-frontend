import React, { Component } from 'react';
import { Grid, Segment } from "semantic-ui-react";
import { validation } from "../Register/validationRules"
import { Input, Form, Typography } from "antd";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "antd/dist/antd.less";
import "../index.css";
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
const FormItem = Form.Item;

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


class EventPlaceDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }


  render () {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <Form onSubmit={this.onSubmit} autoComplete="off">
            <Segment stacked>
              <FormItem
                hasFeedback
                style={{ marginBottom: 12 }}
                autoComplete="off"
                validateStatus={this.props.eventPlaceName.validateStatus}
                help={this.props.eventPlaceName.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceName"
                  value={this.props.eventPlaceName.value}
                  placeholder="Nazwa miejsca"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceName
                    );
                  }}
                />
              </FormItem>
              <FormItem
                style={{ marginBottom: 12 }}
                hasFeedback
                autoComplete="off"
                validateStatus={this.props.eventPlaceDescription.validateStatus}
                help={this.props.eventPlaceDescription.errorMsg}
              >
                <Input
                  autoComplete="off"
                  name="eventPlaceDescription"
                  value={this.props.eventPlaceDescription.value}
                  placeholder="Opis miejsca"
                  onChange={(event) => {
                    this.props.onChange(
                      event,
                      validation.validateEventPlaceDescription
                    );
                  }}
                />
              </FormItem>
              <FormItem>
                <Typography>
                  Wybierz co najmniej jedną dyscyplinę powiązaną z tym miejscem
                </Typography>
              </FormItem>

              <FormItem style={{ marginBottom: 6 }}>
                <ToggleButtonGroup
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={this.props.sportsCategory}
                  onChange={this.props.handleToggle}
                >
                  {toggleSportsCategories.map((item, key) => (
                    <ToggleButton
                      value={item.value}
                      tooltip={item.tooltip}
                      key={key}
                    >
                      <Tooltip title={item.tooltip}>
                        <img height="60" width="60" src={item.icon} alt="" />
                      </Tooltip>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormItem>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventPlaceDetailsForm;