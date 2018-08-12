import React from 'react';
import EditDeck from '../EditDeck'
import EditList from '../EditList'

import { getCommanderTypeSections } from '../../utils/sections';
import { loadFile, saveState } from '../../data'

class DeckEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: null,
			expanded: -1,
			results: []
		}
	}

	componentDidMount () {
		const deckId = this.props.match.params.id;

		loadFile(deckId).then(data => {
			this.setDeck({cards: data.main, config: data.config});
		}, err => {
			this.setState({
				error: 'deck not found'
			});
		});
	}

	setDeck = deck => {
		//If sorting === types
		getCommanderTypeSections(deck.cards).then(sections => {
			this.setState({deck: {
				...deck,
				sections
			}});
		})
	}

	commit = () => {
		saveState(this.props.match.params.id, 'edit', {config: this.state.deck ? this.state.deck.config : {}, main: this.state.deck ? this.state.deck.cards : []});
	}

	render() {
		const { deck, error } = this.state;

		return deck ? <div>
			<EditDeck deck={deck} setDeck={this.setDeck} />
			<EditList deck={deck} setDeck={this.setDeck} />
			
		    <button onClick={this.commit}>Save</button> 
		</div> : error ? <div>{error}</div> : <div>Loading</div>
	}
}

export default DeckEdit