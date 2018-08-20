import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CardSection from '../CardSection';
import DeckNotice from '../DeckNotice';
import { getCommanderTypeSections } from '../../utils/sections';
import { loadFile } from '../../data';
import { BASE_URL } from '../../constants';

import { BaseLayout } from '../Layout'
import { baseStyle, Button, ButtonRow } from '../Css'


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
const StyledTitle = styled.h1`
	${baseStyle}
`
const StyledDescription = styled.p`
	${baseStyle}
`

class DeckView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: null,
			expanded: 0,
			error: null,
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
			getCommanderTypeSections(data.main).then((sections) => {
				this.setState({deck: {cards: data.main, sections, config: data.config}})
			})
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

	navigateTo = (path) => {
		this.props.history.push(`${BASE_URL}deck/${this.props.match.params.id}/${path}`)
	}

	render(){
		const {expanded, deck, error, page} = this.state;
		const config = deck && deck.config ? deck.config : {name: '', description: ''};

		return deck ? <BaseLayout>
			<ButtonRow>
				<Button onClick={() => this.navigateTo('edit')}>Edit</Button>
				<Button onClick={() => this.navigateTo('history')}>History</Button>
			</ButtonRow>

			{ config.name ? <StyledTitle>{config.name}</StyledTitle> : null }
			{ config.description ? <StyledDescription>{config.description}</StyledDescription> : null }

			<StyledDeckList>
				{deck.sections.map((section, index, arr) => {
					const offset = arr.slice(0, index).reduce((prev, next) => prev + next.cards.length, 0);
					return <StyledDeckListItem key={`${index}-${section.title}`}><CardSection
						title={section.title}
						expanded={expanded - offset}
						setExpanded={index => this.setExpanded(offset + index)}
						cards={section.cards}
						/>
					</StyledDeckListItem>
				})}
	        </StyledDeckList>
		</BaseLayout>: error ? <DeckNotice message={`Error: ${error}`} back={true}/> : <DeckNotice message={`Loading`}/>
	}
}

export default withRouter(DeckView)