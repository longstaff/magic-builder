import React from 'react';
import Card from '../Card';
import styled from 'styled-components';

const cardHeight = 310;
const offset = 40;
const bottomOverlap = 10;

const StyledList = styled.ol`
	margin: 0;
	padding: 0;
	position: relative;
	height: ${({count, expanded}) => (count * offset) + (cardHeight - offset) + (expanded ? (cardHeight - offset - bottomOverlap) : 0)}px;
	transition: all 0.2s ease-in-out;
`
const StyledCard = styled.li`
	display: block;
	list-style: none;
	margin: 0;
	padding: 0;
	position: absolute;
	top: ${({index, expandedBefore}) => (index * offset) + (expandedBefore ? (cardHeight - offset - bottomOverlap) : 0)}px;
	transition: all 0.2s ease-in-out;
`


class CardSection extends React.Component {

	render(){
		const {cards, title, expanded} = this.props;

		return <div>
			<h2>{title}</h2>
			<StyledList count={cards.length} expanded={expanded > -1 && expanded < cards.length-1}>
				{cards.map((card, index) => 
					<StyledCard index={index} expandedBefore={expanded > -1 && expanded < index} key={index} onClick={() => this.props.setExpanded(index)}>
						<Card data={card} expanded={index===expanded || index === cards.length-1}/>
					</StyledCard>)}
			</StyledList>
		</div>
	}
}

export default CardSection