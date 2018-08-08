import React from 'react';
import CardSection from '../CardSection';
import ImportList from '../ImportList';

import { getCommanderTypeSections } from '../../utils/sections';

class DeckNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: null,
			expanded: -1,
		}
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
		</div>
	}
}

export default DeckNew