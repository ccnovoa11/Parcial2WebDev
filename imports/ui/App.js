import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
 
import Route from "./Route.js";
import { comments } from "../api/comments.js";
 
export class App extends Component {

 constructor(props) {
  super(props);

  this.state={
    data:null
  };
}

componentDidMount(){

  this.getDataMultipleTimes();
}

callAPI() {

  fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    this.setState({data: data.vehicle });
  })
  .catch((err) => {console.log(err.message)});
}

getDataMultipleTimes() {
  this.callAPI();
  setInterval(() => {
    fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState({data: data.vehicle });
    })
    .catch((err) => {console.log(err.message)});

  } ,15000);
}
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Routes from San Francisco</h1>
        </header>

        <Route buses = {this.state.data}></Route>
      </div>
    );
  }
}

export default withTracker(
  () => {
    return {};
  }
  )(App);