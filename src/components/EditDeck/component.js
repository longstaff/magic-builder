import React from 'react';
import CardMenu from '../CardMenu';
import CardSection from '../CardSection';
import FindCard from '../FindCard';			

import { getCommanderTypeSections } from '../../utils/sections';

class EditDeck extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	setName = name => {
		const { deck } = this.props;
		const config = deck && deck.config || {name: '', description: ''}
		this.props.setDeck({
			...deck,
			config: {
				...config,
				name
			}
		})
	}
	setDescription = description => {
		const { deck } = this.props;
		const config = deck && deck.config || {name: '', description: ''}
		this.props.setDeck({
			...deck,
			config: {
				...config,
				description
			}
		})
	}

	render() {
		const { expanded } = this.state;
		const { deck } = this.props;

		const config = deck && deck.config || {name: '', description: ''}

		return <div>
			<h3>Config</h3>
			<input type="text" onChange={ev => this.setName(ev.target.value)} placeholder="deck name" value={config.name}/>
			<textarea onChange={ev => this.setDescription(ev.target.value)}>{config.description}</textarea>
		</div>
	}
}

export default EditDeck