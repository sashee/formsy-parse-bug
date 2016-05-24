"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import FRC from "formsy-react-components";

window.addEventListener("load", () => {
	ReactDOM.render(<Component/>, document.getElementById("main"));
});
Formsy.addValidationRule("notEqualsAny", (values, value, array) => {
	return !array.includes(value);
});

const Component = React.createClass({
	getInitialState() {
		return {
			data: []
		};
	},
	add(values) {
		this.setState({data: [...this.state.data, values.value]});
	},
	render() {
		console.log(JSON.stringify(this.state.data));
		return (
			<div>
				<p>This is a demonstration to Formsy's JSON parsing quirk</p>
				<p>There is a list of the already added elements at the top</p>
				<p>Below is a form that you can use to add new elements</p>
				<p>If the input contains an element already in the list, the input goes red, indication an invalid
					state</p>
				<p>The validator uses the string syntax (instead of object syntax), and even though it is properly
					escaped, if you input JSON structures, it will break</p>
				<p>To reproduce:</p>
				<ul>
					<li>Notice that if you add alphanumeric elements, all is working well</li>
					<li>Add <code>{'{}'}</code> (two curly braces) and the validation breaks from there on, emitting an exception in the
						console</li>
				</ul>
				<ul>
					{this.state.data.map((value) => {
						return (
							<li>{value}</li>
						);
					})}
				</ul>
				<Formsy.Form onSubmit={this.add}>
					<FRC.Input name="value"
						validations={`notEqualsAny: ${JSON.stringify(this.state.data)}`}
						/>
					<button type="submit">Add</button>
				</Formsy.Form>
			</div>
		);
	}
});

