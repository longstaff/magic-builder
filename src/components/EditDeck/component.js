import React from 'react';

class EditDeck extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	setName = name => {
		const { config = {name: '', description: ''} } = this.props;

		this.props.setConfig({
			...config,
			name
		})
	}
	setDescription = description => {
		const { config = {name: '', description: ''} } = this.props;
		this.props.setConfig({
			...config,
			description
		})
	}

	render() {
		const { config = {name: '', description: ''} } = this.props;

		return <div>
			<h3>Config</h3>
			<input type="text" onChange={ev => this.setName(ev.target.value)} placeholder="deck name" value={config.name}/>
			<textarea onChange={ev => this.setDescription(ev.target.value)} value={config.description} />
		</div>
	}
}

export default EditDeck