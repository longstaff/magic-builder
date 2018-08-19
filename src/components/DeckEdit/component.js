import React from 'react';
import styled from 'styled-components';
import EditDeck from '../EditDeck';
import EditList from '../EditList';
import CommitModal from '../CommitModal';
import { loadFile, saveState } from '../../data';

import { BaseLayout } from '../Layout';
import { Button } from '../Css';

const StyledBaseLayout = styled(BaseLayout)`
	overflow: ${props => props.scrollFreeze ? 'hidden' : 'auto'};
`
const StyledButton = styled(Button)`
	width: 100%;
	margin-top: 30px;
`

class DeckEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: {},
			cards: [],
			expanded: 0,
			loaded: false,
			modal: false,
			scrollFreeze: false
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
	setScrollFreeze = (scrollFreeze) => {
		this.setState({scrollFreeze})
	}

	render() {
		const { config, cards, loaded, error, modal, scrollFreeze } = this.state;

		return loaded ? <StyledBaseLayout scrollFreeze={scrollFreeze || modal}>
			{modal ? <CommitModal cancel={this.modalCancel} commit={this.modalCommit}/> : null}

			<EditDeck config={config} setConfig={config => this.setState({config})} />
			<EditList cards={cards} setCards={cards => this.setState({cards})} setScrollFreeze={this.setScrollFreeze} />
			
		    <StyledButton onClick={this.openPopup}>Save</StyledButton> 
		</StyledBaseLayout> : error ? <div>{error}</div> : <div>Loading</div>
	}
}

export default DeckEdit