import React from 'react';
import {SectionTitle, TextInput, TextArea} from '../Css';

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
			<SectionTitle>Deck information</SectionTitle>
			<TextInput type="text" onChange={ev => this.setName(ev.target.value)} placeholder="deck name" value={config.name}/>
			<TextArea onChange={ev => this.setDescription(ev.target.value)} value={config.description} placeholder="deck description" />
		</div>
	}
}

export default EditDeck