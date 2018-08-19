import React from 'react';
import styled from 'styled-components';

export const PADDING = 10;
export const BORDER = 1;

const backgroundColours = {
	'U': '#66B6E0',
	'W': '#E5E2CD',
	'B': '#28241C',
	'R': '#C52C1D',
	'G': '#578162',
	'': '#CACBCF'
}

const StyledCardBase = styled.div`
	color: black;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	background: black;
	border: ${BORDER}px solid white;
	border-radius: 12px;
    padding: ${PADDING}px;
    box-sizing: border-box;
`;
const StyledCardInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background: ${({background}) => background};
	border-radius: 3px;
	box-sizing: margin-box;
`

const getCardColour = card => {
	const backgroundIndex = card.manaCost ? card.manaCost.replace(/[{}/P]/g, '').split('').filter((l,i,a) => {
		return isNaN(+l) && !a.slice(i+1).find(test => test === l);
	}).join(':') : card.colorIdentity ? card.colorIdentity.join(':') : '';
	return backgroundColours[backgroundIndex] || '#CDBA86';
}

const CardBase = ({card = {}, children, width=223, height=310, ...props}) => {
	const background = getCardColour(card)

	return <StyledCardBase width={width} height={height} {...props}>
		<StyledCardInner background={background}>
			{children}
		</StyledCardInner>
	</StyledCardBase>
}

export default CardBase