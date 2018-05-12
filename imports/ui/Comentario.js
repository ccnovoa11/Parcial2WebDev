import React, { Component } from 'react';
import { Comentarios } from '../api/comentarios.js';

// Task component - represents a single todo item
export default class Comentario extends Component {

	render() {
		return (
			<p>
	            <strong>
	            	{this.props.comentario.username}
	            </strong>: {this.props.comentario.text}
			</p>
			);
	}
}