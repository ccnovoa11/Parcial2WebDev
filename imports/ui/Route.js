import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Route extends Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}