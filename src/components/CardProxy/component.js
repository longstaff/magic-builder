import React from 'react';
import styled from 'styled-components';
import 'mana-font';
import CardBase from '../CardBase';

const StyledTitleBar = styled.div`
	position: absolute;
	display: flex;
	top: 3px;
	height: 16px;
	left: 3px;
	right: 3px;
	border: 1px solid black;
	border-radius: 4px; 
	padding: 2px 5px;
	background: rgba(255,255,255,0.5);
`

const StyledTitle = styled.span`
    font-family: serif;
    font-weight: bold;
    font-size: 0.75em;
    flex-grow: 1;
    align-self: center;
`;
const StyledMana = styled.span`
    font-family: serif;
    font-weight: bold;
    font-size: 0.55em;
    align-self: center;
`;

const StyledCost = styled.span`
	font-size: 0.8em;
	border-bottom: 1px solid rgba(0,0,0,0.5);
	margin: 0 0 0 1px;
`

const StyledTypeBar = styled.div`
	position: absolute;
	display: flex;
	top: 154px;
	height: 16px;
	left: 3px;
	right: 3px;
	border: 1px solid black;
	border-radius: 4px; 
	padding: 2px 5px;
	background: rgba(255,255,255,0.5);
`

const StyledType = styled.span`
    font-family: serif;
    font-weight: bold;
    font-size: 0.65em;
    flex-grow: 1;
    align-self: center;
`;

const StyledTextHolder = styled.div`
	position: absolute;
	top:174px;
	bottom: 10px;
	left: 5px;
	right: 5px;
	background: white;
	border: 1px solid rgba(0,0,0,0.5);
	padding: 6px 8px;
`
const StyledText = styled.div`
    font-family: serif;
	font-size: 0.6em;
`
const StyledFlavour = styled.div`
    font-family: serif;
	font-size: 0.65em;
    font-style: italic;
`

const StyledStats = styled.div`
	position: absolute;
	width:30px;
	bottom: 3px;
	height: 10px;
	right: 3px;
	background: white;
	border: 1px solid rgba(0,0,0,0.5);
	padding: 3px;
	border-radius: 4px;
    font-family: serif;
    font-weight: bold;
    font-size: 0.65em;
    text-align: center;
`
const getSymbol = symbol => {
	switch(symbol) {
		case 'T': return 'tap';
		case 'Q': return 'untap';
		default: return symbol.replace('/', '').toLowerCase();
	}
}
const generateCost = manaCost => {
	if(!manaCost) return null;
	return <React.Fragment>
		{manaCost.replace(/\{/g, '').split('}').map(
			(cost, index) => cost ? <StyledCost key={index} className={`ms ms-cost ms-${getSymbol(cost)}`}></StyledCost> : null
		)}
	</React.Fragment>
}
const addManaSymbols = text => {
	return <React.Fragment>
		{text.split(/[}{]/).map((value, index) => {
			return index % 2 === 1 ? <StyledCost key={index} className={`ms ms-cost ms-${getSymbol(value)}`}></StyledCost>
			: value;
		})}
	</React.Fragment>
}

const CardProxy = ({card = {}}) => {
	return <CardBase card={card}>
		<StyledTitleBar>
			<StyledTitle>{card.name}</StyledTitle><StyledMana>{generateCost(card.manaCost)}</StyledMana>
		</StyledTitleBar>

		<StyledTypeBar>
			<StyledType>{card.type}</StyledType>
		</StyledTypeBar>
		<StyledTextHolder>
			{card.text ? card.text.split(/\n/g).map((text, ind) => <StyledText key={ind}>{addManaSymbols(text)}</StyledText>) : null}
			{card.flavor ? card.flavor.split(/\n/g).map((text, ind) => <StyledFlavour key={ind}>{text}</StyledFlavour>) : null}
		</StyledTextHolder>

		{card.power && card.toughness ? <StyledStats>{`${card.power} / ${card.toughness}`}</StyledStats>: null}
	</CardBase>
}

export default CardProxy