import React from 'react';
import EditList from '../EditList'
import EditDeck from '../EditDeck'
import ImportList from '../ImportList';
import { initRepo, saveState, checkSlug } from '../../data'

class DeckNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			config: {},
			cards: [],
			expanded: -1,
		}
	}
	componentDidMount() {
		initRepo();
	}

	setImport = cards => {
		this.setState({cards});
	}

	commit = () => {
		const name = this.state.config.name
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
			saveState(newSlug, 'initial commit', {config: this.state.config, main: this.state.cards});
		})
	}

	render(){
		const {config, cards} = this.state;

		return <div>
			<EditDeck config={config} setConfig={config => this.setState({config})}/>
			<ImportList completeImport={this.setImport} />
			<EditList cards={cards} setCards={cards => this.setState({cards})} />
			
			<button onClick={this.commit}>Save</button> 
		</div>
	}
}

export default DeckNew