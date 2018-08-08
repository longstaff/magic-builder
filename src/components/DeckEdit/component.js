import React from 'react';
import CardMenu from '../CardMenu';
import FindCard from '../FindCard';
import CardSection from '../CardSection';

import { getCommanderTypeSections } from '../../utils/sections';

class DeckEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: {cards: [
					{name: 'Karona, false god'},
					{name: 'Forest'},
					{name: 'Mountain'},
					{name: 'Island'},
					{name: 'Plains'},
					{name: 'Swamp'},
					{name: 'Temple of the false god'},
				],
				sections: [{
					title: 'Ye God',
					cards: [
						{name: 'Karona, false god'},
					]
				},
				{
					title: 'Lands',
					cards: [
						{name: 'Forest'},
						{name: 'Mountain'},
						{name: 'Island'},
						{name: 'Plains'},
						{name: 'Swamp'},
						{name: 'Temple of the false god'},
					]
				}]
			},
			expanded: -1,
			results: []
		}
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
	addCard = card => {
		const {deck = { cards: [] }} = this.state;

		this.setDeck({
			...deck,
			cards: deck.cards = [
				...deck.cards,
				{name: card.name}
			]
		});
	}
	removeCard = card => {
		const {deck = { cards: [] }} = this.state;

		this.setDeck({
			...deck,
			cards: [
				...deck.cards.filter((test) => test.name !== card.name),
				...deck.cards.filter((test) => test.name === card.name).slice(1)
			]
		});
	}

	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	getMenu = card => <CardMenu
		card={card}
		deck={this.state.deck}
		addCard={this.addCard}
		removeCard={this.removeCard}
	/>

	render() {
		return <div>
			{
				this.state.deck && this.state.deck.cards.length ?
					<CardSection
						title={`Results (${this.state.results.length})`}
						cards={this.state.deck.cards}
						expanded={this.state.expanded}
						setExpanded={this.setExpanded}
						getMenu={this.getMenu}
					/>
					: null
			} 

			<FindCard deck={this.state.deck} addCard={this.addCard} removeCard={this.removeCard}/>
		</div>
	}
}

export default DeckEdit