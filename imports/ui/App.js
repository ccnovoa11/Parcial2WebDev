import React, { Component } from 'react';
 
import Route from './Route.js';
 
// App component - represents the whole app
export default class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'Using nextbus API' }
    ];
  }
 
  renderTasks() {
    return this.getTasks().map((task) => (
      <Route key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Routes from San Francisco</h1>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}