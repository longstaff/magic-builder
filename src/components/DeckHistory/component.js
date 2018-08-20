import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CardSection from '../CardSection';
import History from '../History';
import DeckNotice from '../DeckNotice'
import { getCommanderTypeSections } from '../../utils/sections';
import { BaseLayout } from '../Layout'
import { Button } from '../Css'
import { BASE_URL } from '../../constants'

import { loadFile } from '../../data';

const PAGE_MAIN = 0;
const PAGE_HISTORY = 1;

const StyledButton = styled(Button)`
	width: 100%;
`
const StyledDeckList = styled.ul`
	margin:0;
	padding:0;
	list-style:none;
`
const StyledDeckListItem = styled.li`
	margin:0;
	padding:0;
	list-style:none;
`

class DeckView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: null,
			expanded: 0,
			error: null
		}
	}
	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	componentDidMount () {
		window.addEventListener('keyup', this.onKeyUp)
		const deckId = this.props.match.params.id;

		loadFile(deckId).then(data => {
			//getCommanderTypeSections(data.main).then((sections) => {
			this.setState({deck: {cards: data.main, config: data.config}})
			//})
		}, err => {
			this.setState({
				error: 'deck not found'
			});
		});
	}
	componentWillUnmount() {
		window.removeEventListener('keyup', this.onKeyUp)
	}

	onKeyUp = ev => {
		if(ev.key === 'ArrowUp') {
			this.setState({expanded: Math.max(0, this.state.expanded -1)})
			ev.preventDefault();
		}
		else if(ev.key === 'ArrowDown') {
			this.setState({expanded: Math.min(this.state.deck.cards.length-1, this.state.expanded + 1)})
			ev.preventDefault();
		}
	}

	onMainNav = () => {
		const deckId = this.props.match.params.id;
		this.props.history.push(`${BASE_URL}deck/${deckId}`);
	}

	render(){
		const {expanded, deck, error} = this.state;
		const config = deck && deck.config ? deck.config : {name: '', description: ''};

		return deck ? <BaseLayout>
			<StyledButton onClick={this.onMainNav}>Card list</StyledButton>
			<History 
				expanded={expanded}
				setExpanded={this.setExpanded}
			/>
		</BaseLayout>: error ? <DeckNotice message={`Error: ${error}`} back={true}/> : <DeckNotice message={`Loading`}/>
	}
}

export default withRouter(DeckView)