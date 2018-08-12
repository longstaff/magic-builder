import React from 'react';
import EditList from '../EditList'
import EditDeck from '../EditDeck'
import ImportList from '../ImportList';

import { getCommanderTypeSections } from '../../utils/sections';
import { initRepo, saveState, checkSlug } from '../../data'

class DeckNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: {
				config: {},
				cards: []
			},
			expanded: -1,
		}
	}
	componentDidMount() {
		initRepo();
	}

	setDeck = deck => {
		this.setState({deck});
	}

	commit = () => {
		const name = this.state.deck.config.name
		if (!name) {
			alert('Must have a name');
			return
		}

		const newSlug = name.replace(/\s/, '-');
		checkSlug(newSlug).then(used => {
			if (used) {
				alert('duplicate name found, use a different one');
				return
			}
			saveState(newSlug, 'initial import', {config: this.state.deck.config, main: this.state.deck.cards});
		})
	}

	render(){
		const {expanded, deck} = this.state;

		return <div>
			<EditDeck deck={deck} setDeck={this.setDeck}/>
			<ImportList completeImport={this.setDeck} />
			<EditList deck={deck} setDeck={this.setDeck} />
			
			<button onClick={this.commit}>Save</button> 
		</div>
	}
}

export default DeckNew