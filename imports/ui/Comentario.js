import React, { Component } from 'react';
import { Comentarios } from '../api/comentarios.js';

// Task component - represents a single todo item
export default class Comentario extends Component {

	render() {
		return (
			<div>
				<div className ="col-sm-6">
	            	<h4>
	            		Usuario: <br/>{this.props.comentario.username}
	            	</h4>
	            	<p> 
	            		{this.props.comentario.text}
	            	</p>
	            </div>
			</div>
			);
	}
}