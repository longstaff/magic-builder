import React from 'react';
import { Link } from 'react-router-dom';
import CardSection from '../CardSection';
import History from '../History';
import { getCommanderTypeSections } from '../../utils/sections';

import { loadFile } from '../../data';

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
			getCommanderTypeSections(data.main).then((sections) => {
				this.setState({deck: {cards: data.main, sections, config: data.config}})
			})
		}, err => {
			console.log('FAILED', err)
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
		const {expanded, deck, error} = this.state;
		const config = deck && deck.config || {name: '', description: ''}

		return error ? 
			<h1>{`Error: ${error}`}</h1>
			: deck ? <div>
			<Link to={`/deck/${this.props.match.params.id}/edit`}>Edit</Link>

			{ config.name ? <h1>{config.name}</h1> : null }
			{ config.description ? <p>{config.description}</p> : null }

			<History />

			<ul>
				{deck.sections.map((section, index, arr) => {
					const offset = arr.slice(0, index).reduce((prev, next) => prev + next.cards.length, 0);
					return <li key={section.title}><CardSection
						title={section.title}
						expanded={this.state.expanded - offset}
						setExpanded={index => this.setExpanded(offset + index)}
						cards={section.cards}
						/>
					</li>
				})}
	        </ul>
	    </div> : <h1>Loading</h1>
	}
}

export default DeckView