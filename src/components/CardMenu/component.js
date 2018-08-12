import React from 'react';
import styled from 'styled-components';


const StyledList = styled.ul`
	margin: 0;
	padding: 0;
`
const StyledItem = styled.li`
	display: block;
	list-style: none;
	margin: 0;
	padding: 0;
`
const StyledStatus = styled.div`

`
const StyledButton = styled.button`

`

class CardSection extends React.Component {
	render(){
		const {cards = [], card, addCard, removeCard} = this.props;
		const count = cards.filter(check => check.name === card.name).length;

		return <StyledList>
			<StyledItem><StyledButton onClick={() => addCard(card)}>+</StyledButton></StyledItem>
			<StyledItem><StyledStatus>{count}</StyledStatus></StyledItem>
			<StyledItem><StyledButton onClick={() => removeCard(card)}>-</StyledButton></StyledItem>
		</StyledList>
	}
}

export default CardSection