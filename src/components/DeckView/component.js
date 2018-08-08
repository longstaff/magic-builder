import React from 'react';
import CardSection from '../CardSection';

import { Link } from 'react-router-dom';

class DeckView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: {cards: [
					{name: 'karona, false god'},
					{name: 'forest'},
					{name: 'mountain'},
					{name: 'island'},
					{name: 'plains'},
					{name: 'swamp'},
					{name: 'temple of the false god'},
				],
				sections: [{
					title: 'Ye God',
					cards: [
						{name: 'karona, false god'},
					]
				},
				{
					title: 'Lands',
					cards: [
						{name: 'forest'},
						{name: 'mountain'},
						{name: 'island'},
						{name: 'plains'},
						{name: 'swamp'},
						{name: 'temple of the false god'},
					]
				}]
			},
			expanded: 0,
		}
	}
	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	componentDidMount () {
		window.addEventListener('keyup', this.onKeyUp)
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
		const {expanded, deck} = this.state;

		return <div>
			<Link to="/deck/slug/edit">Edit</Link>
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
	    </div>
	}
}

export default DeckView