import React, { Component } from 'react';
import { Grid, Segment, List, Pagination} from "semantic-ui-react";
import { eventPlaceService } from "../../Api/Api";
import LoadingIndicator from "../../common/LoadingIndicator";
import FilterBar from "./FilterBar"
import EventPlaceCard from "./EventPlaceCard"
import PlaceOpinionCard from '../../PlaceOpinion/PlaceOpinionCard';

class NewEventPlaceAccept extends Component {
  constructor(propos) {
    super(propos);
    this.state = {
      isLoading: true,
      listOfEventPlaces: null,
      activePage: 1,
      totalPages: null,
      itemsCountPerPage: 10,
      totalItemsCount: null,
      filtering: "ALL",
      sorting: "ASC_eventPlaceId",
    };
  }

  componentDidMount() {
    this.getAllEventPlace(this.state.activePage, this.state.itemsCountPerPage, this.state.filtering, this.state.sorting);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.getAllEventPlace(activePage, this.state.itemsCountPerPage, this.state.filtering, this.state.sorting);
  };

  handleChangeItemsOnPage = (e, { value }) => {
    this.setState({ itemsCountPerPage: value });
    this.getAllEventPlace(this.state.activePage, value, this.state.filtering, this.state.sorting);
  };

  handleChangeFiltering = (e, { value }) => {
    this.setState({ filtering: value, activePage: 1 });
    this.getAllEventPlace(1, this.state.itemsCountPerPage, value, this.state.sorting);
  };

  handleChangeSorting = (e, { value }) => {
    this.setState({ sorting: value });
    this.getAllEventPlace(this.state.activePage, this.state.itemsCountPerPage, this.state.filtering, value);
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

  getAllEventPlace(activePage, itemsOnSite, filtering, sorting) {
    this.setState({ isLoading: true });
    eventPlaceService
      .getEventPlace(activePage, itemsOnSite, filtering, sorting)
      .then((response) => {
        this.setState({
          totalPages: response.totalPages,
          totalItemsCount: response.totalElements,
        });

        const results = response.content;
        const updatedResults = results.map((results) => {
          return {
            ...results,
          };
        });
        this.setState({ listOfEventPlaces: updatedResults });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={14} computer={8}>
          <Segment padded>
            <FilterBar
              isLoading={this.state.isLoading}
              itemsCountPerPage={this.state.itemsCountPerPage}
              sorting={this.state.sorting}
              filtering={this.state.filtering}
              onChangeItemsOnPage={this.handleChangeItemsOnPage}
              onChangeSorting={this.handleChangeSorting}
              onChangeFiltering={this.handleChangeFiltering}
            />
          </Segment>
          <Pagination
            activePage={this.state.activePage}
            boundaryRange={1}
            onPageChange={this.handlePaginationChange}
            size="mini"
            siblingRange={1}
            totalPages={this.state.totalPages}
          />
          <Segment textAlign="left">
            {this.state.isLoading === true ? (
              <LoadingIndicator />
            ) : (
              <React.Fragment>
                <List divided verticalAlign="middle" size="huge">
                  {this.state.listOfEventPlaces.map((eventPlace) => (
                    <Segment>
                      <EventPlaceCard
                        key={eventPlace.eventPlaceID}
                        eventPlaceDetails={eventPlace}
                      ></EventPlaceCard>
                    </Segment>
                  ))}
                </List>
              </React.Fragment>
            )}
          </Segment>

          {/* Opinia o eventplace(zhardcodowane id) */}
          <Segment>
            <PlaceOpinionCard>

            </PlaceOpinionCard>
          </Segment>
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default NewEventPlaceAccept;