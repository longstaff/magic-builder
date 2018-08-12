import React from 'react';
import EditDeck from '../EditDeck'
import EditList from '../EditList'

import { getCommanderTypeSections } from '../../utils/sections';
import { loadFile, saveState } from '../../data'

class DeckEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: {},
			cards: [],
			expanded: -1,
			loaded: false
		}
	}

	componentDidMount () {
		const deckId = this.props.match.params.id;

		loadFile(deckId).then(data => {
			this.setState({cards: data.main, config: data.config, loaded:true});
		}, err => {
			this.setState({
				error: 'deck not found'
			});
		});
	}

	commit = () => {
		saveState(this.props.match.params.id, 'edit', {config: this.state.config, main: this.state.cards});
	}

	render() {
		const { config, cards, loaded, error } = this.state;

		return loaded ? <div>
			<EditDeck config={config} setConfig={config => this.setState({config})} />
			<EditList cards={cards} setCards={cards => this.setState({cards})} />
			
		    <button onClick={this.commit}>Save</button> 
		</div> : error ? <div>{error}</div> : <div>Loading</div>
	}
}

export default DeckEdit