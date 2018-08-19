import React from 'react';
import CardMenu from '../CardMenu';
import CardSection from '../CardSection';
import FindCard from '../FindCard';

class EditList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: -1,
		}
	}

	addCard = card => {
		const {cards = []} = this.props;

		this.props.setCards([
			...cards,
			{name: card.name}
		]);
	}
	removeCard = card => {
		const {cards = []} = this.props;

		this.props.setCards([
			...cards.filter((test) => test.name !== card.name),
			...cards.filter((test) => test.name === card.name).slice(1)
		]);
	}

	setExpanded = (index) => {
		this.setState({
			expanded: index
		});
	}

	getMenu = card => <CardMenu
		card={card}
		cards={this.props.cards}
		addCard={this.addCard}
		removeCard={this.removeCard}
	/>

	render() {
		const { expanded } = this.state;
		const { cards = [] } = this.props;

		return <div>
			{
				cards.length ?
					<CardSection
						title={`All cards (${cards.length})`}
						cards={cards}
						expanded={expanded}
						setExpanded={this.setExpanded}
						getMenu={this.getMenu}
					/>
					: null
			} 
			<FindCard cards={cards} addCard={this.addCard} removeCard={this.removeCard}/>
		</div>
	}
}

export default EditList