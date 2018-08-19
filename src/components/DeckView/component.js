import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CardSection from '../CardSection';
import { getCommanderTypeSections } from '../../utils/sections';
import { loadFile } from '../../data';

import { BaseLayout } from '../Layout'
import { Button } from '../Css'


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
		this.props.history.push(`/deck/${this.props.match.params.id}/${path}`)
	}

	render(){
		const {expanded, deck, error, page} = this.state;
		const config = deck && deck.config ? deck.config : {name: '', description: ''};

		return deck ? <BaseLayout>
			<Button onClick={() => this.navigateTo('edit')}>Edit</Button>
			<Button onClick={() => this.navigateTo('history')}>History</Button>

			{ config.name ? <h1>{config.name}</h1> : null }
			{ config.description ? <p>{config.description}</p> : null }

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
		</BaseLayout>: error ? <h1>{`Error: ${error}`}</h1> : <h1>Loading</h1>
	}
}

export default withRouter(DeckView)