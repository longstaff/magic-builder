import React from 'react';
import CardSection from '../CardSection';
import ImportList from '../ImportList';

import { getCommanderTypeSections } from '../../utils/sections';
import { initRepo, saveData } from '../../data/git'

class DeckNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: null,
			expanded: -1,
		}
	}
	componentDidMount() {
		initRepo();
	}

	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	setDeck = deck => {
		//If sorting === types
		getCommanderTypeSections(deck.cards).then(sections => {
			this.setState({deck: {
				...deck,
				sections
			}});
		})
	}

	commit = () => {
		saveData('initial import', {main: this.state.deck ? this.state.deck.cards : []});
	}

	render(){
		const {expanded, deck} = this.state;

		return <div>
			<ImportList completeImport={this.setDeck} />

			{ 
				deck ? 
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
			        : null
		    }

		    <button onClick={this.commit}>Save</button> 
		</div>
	}
}

export default DeckNew