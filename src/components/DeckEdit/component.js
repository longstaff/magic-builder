import React from 'react';
import EditDeck from '../EditDeck'
import EditList from '../EditList'
import CommitModal from '../CommitModal'
import { loadFile, saveState } from '../../data'

import { BaseLayout } from '../Layout'
import { Button } from '../Css'

class DeckEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: {},
			cards: [],
			expanded: -1,
			loaded: false,
			modal: false,
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

	openPopup = () => {
		this.setState({modal: true});
	}
	modalCommit = message => {
		saveState(this.props.match.params.id, message, {config: this.state.config, main: this.state.cards});
		this.setState({modal: false});
	}
	modalCancel = () => {
		this.setState({modal: false});
	}

	render() {
		const { config, cards, loaded, error, modal } = this.state;

		return loaded ? <BaseLayout>
			{modal ? <CommitModal cancel={this.modalCancel} commit={this.modalCommit}/> : null}

			<EditDeck config={config} setConfig={config => this.setState({config})} />
			<EditList cards={cards} setCards={cards => this.setState({cards})} />
			
		    <Button onClick={this.openPopup}>Save</Button> 
		</BaseLayout> : error ? <div>{error}</div> : <div>Loading</div>
	}
}

export default DeckEdit