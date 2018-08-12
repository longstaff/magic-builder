import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CardSection from '../CardSection';
import History from '../History';
import { getCommanderTypeSections } from '../../utils/sections';

import { loadFile } from '../../data';

const PAGE_MAIN = 0;
const PAGE_HISTORY = 1;

const StyledHolder = styled.div`
	position: absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	overflow-x: hidden;
`
const StyledDraws = styled.div`
	width: 200%;
	position: relative;
	display: grid;
	grid-template-areas: 'main history';
     grid-template-columns: 1fr 1fr;
	overflow: hidden;
	transition: all 0.5s ease-in-out;
	left: ${ ({ page }) => `-${page * 100}%` }
`
const StyledDeckMain = styled.div`
	width: 100%;
	height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	grid-area: 'main';
`
const StyledDeckHistory = styled.div`
	width: 100%;
	height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	grid-area: 'history';
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
			error: null,
			page: PAGE_MAIN
		}
	}
	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	togglePage = () => {
		this.setState({page: this.state.page === PAGE_MAIN ? PAGE_HISTORY : PAGE_MAIN})
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

	render(){
		const {expanded, deck, error, page} = this.state;
		const config = deck && deck.config ? deck.config : {name: '', description: ''};

		return deck ? <StyledHolder>
			<StyledDraws page={page}>
				<StyledDeckMain>

					<Link to={`/deck/${this.props.match.params.id}/edit`}>Edit</Link>
					<a onClick={this.togglePage}>History</a>

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
				</StyledDeckMain>

				<StyledDeckHistory>
					<a onClick={this.togglePage}>Main</a>
					<History />
				</StyledDeckHistory>
			</StyledDraws>
	    </StyledHolder> : error ? <h1>{`Error: ${error}`}</h1> : <h1>Loading</h1>
	}
}

export default DeckView