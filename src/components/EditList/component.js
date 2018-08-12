import React from 'react';
import CardMenu from '../CardMenu';
import CardSection from '../CardSection';
import FindCard from '../FindCard';			

import { getCommanderTypeSections } from '../../utils/sections';

class EditList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: -1,
		}
	}

	addCard = card => {
		const {deck = { cards: [] }} = this.props;

		this.props.setDeck({
			...deck,
			cards: deck.cards = [
				...deck.cards,
				{name: card.name}
			]
		});
	}
	removeCard = card => {
		const {deck = { cards: [] }} = this.props;

		this.props.setDeck({
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
		deck={this.props.deck}
		addCard={this.addCard}
		removeCard={this.removeCard}
	/>

	render() {
		const { expanded } = this.state;
		const { deck } = this.props;

		return <div>
			{
				deck && deck.cards.length ?
					<CardSection
						title={`Complete list (${deck.cards.length})`}
						cards={deck.cards}
						expanded={expanded}
						setExpanded={this.setExpanded}
						getMenu={this.getMenu}
					/>
					: null
			} 
			<FindCard deck={deck} addCard={this.addCard} removeCard={this.removeCard}/>
		</div>
	}
}

export default EditList