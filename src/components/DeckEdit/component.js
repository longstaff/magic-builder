import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import EditDeck from '../EditDeck';
import EditList from '../EditList';
import CommitModal from '../CommitModal';
import LoadingModal from '../LoadingModal';
import DeckNotice from '../DeckNotice'
import { loadFile, saveState } from '../../data';
import { BASE_URL } from '../../constants';

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
			scrollFreeze: false,
			server: false,
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
		this.setState({modal: false, server: true});
		saveState(this.props.match.params.id, message, {config: this.state.config, main: this.state.cards})
			.then(() => this.props.history.push(`${BASE_URL}deck/${this.props.match.params.id}/`));
	}
	modalCancel = () => {
		this.setState({modal: false});
	}
	setScrollFreeze = (scrollFreeze) => {
		this.setState({scrollFreeze})
	}

	render() {
		const { config, cards, loaded, error, modal, server, scrollFreeze } = this.state;

		return loaded ? <StyledBaseLayout scrollFreeze={scrollFreeze || modal || server}>
			{modal ? <CommitModal cancel={this.modalCancel} commit={this.modalCommit}/> : null}
			{server ? <LoadingModal/> : null}

			<EditDeck config={config} setConfig={config => this.setState({config})} />
			<EditList cards={cards} setCards={cards => this.setState({cards})} setScrollFreeze={this.setScrollFreeze} />
			
		    <StyledButton onClick={this.openPopup}>Save</StyledButton> 
		</StyledBaseLayout> : error ? <DeckNotice message={`Error: ${error}`} back={true}/> : <DeckNotice message={`Loading`}/>
	}
}

export default withRouter(DeckEdit)