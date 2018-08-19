import React from 'react';
import styled from 'styled-components';
import CardMenu from '../CardMenu';
import CardSection from '../CardSection';
import FindCard from '../FindCard';
import { Button, ModalBox, ModalOverlay } from '../Css';

const StyledButton = styled(Button)`
	width:100%;
`
const StyledCloseButton = styled(Button)`
	margin-top:20px;
	width:100%;
`

class EditList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: 0,
			searching: false
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

	searchCards = () => {
		this.setState({searching: true})
		if (this.props.setScrollFreeze) this.props.setScrollFreeze(true)
	}
	completeSearchCards = () => {
		this.setState({searching: false})
		if (this.props.setScrollFreeze) this.props.setScrollFreeze(false)
	}

	getMenu = card => <CardMenu
		card={card}
		cards={this.props.cards}
		addCard={this.addCard}
		removeCard={this.removeCard}
	/>

	render() {
		const { expanded, searching } = this.state;
		const { cards = [] } = this.props;

		return <div>
			<StyledButton onClick={this.searchCards}>Search for card</StyledButton>
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

			{searching ? <ModalOverlay>
				<ModalBox>
					<FindCard cards={cards} addCard={this.addCard} removeCard={this.removeCard}/>
					<StyledCloseButton onClick={this.completeSearchCards}>Done</StyledCloseButton>
				</ModalBox>
			</ModalOverlay> : null}
		</div>
	}
}

export default EditList