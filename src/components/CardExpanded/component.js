import React from 'react';
import styled from 'styled-components';

import CardProxy from '../CardProxy';
import CardBase, { PADDING, BORDER } from '../CardBase';

const StyledImage = styled.img`
	position: absolute;
	left: -${PADDING + BORDER}px;
	top: -${PADDING + BORDER}px;
	clip-path: inset(${PADDING}px);
`

const Card = ({card}) => {
	return card.imageUrl ? <CardBase card={card}>
		<StyledImage src={card.imageUrl} alt=""/>
	</CardBase> : <CardProxy card={card}/>;
}

export default Card