import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Route from "./Route.js";
import Comentario from "./Comentario.js";
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Comentarios } from "../api/comentarios.js";

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

 handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Comentarios.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),           
      username: Meteor.user().username
    }); 
    
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
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

mostrarComentarios(){
  return this.props.comentarios.map((comentario) =>(
    <Comentario key={comentario._id} comentario={comentario}/>
    ));
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
        <AccountsUIWrapper />
        <div className="titulo">
          <h1>Routes from San Francisco</h1>
        </div>

        <Route buses = {this.state.data}></Route>
        <p className = "zonaComentario">¿Algún problema?. Deja que los demás lo sepan!</p>
        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Comentario..."/>
       </form>
       <div>
          {this.mostrarComentarios()}
       </div>
      </div>
      );
  }
}

App.propTypes = {
  comentarios: PropTypes.array.isRequired
};

export default withTracker(
  () => {
    Meteor.subscribe("comentarios");
    return {
      comentarios: Comentarios.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  }
  )(App);