import React from 'react';
import styled from 'styled-components';
import { Button, BodyTextStyles } from '../Css';

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
	${BodyTextStyles}
	width: 40px;
	text-align: center;
	margin: 10px 0;
`
const StyledButton = styled(Button)`
	width: 40px;
	padding-left: 0;
	padding-right: 0;
`

class CardMenu extends React.Component {
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

export default CardMenu