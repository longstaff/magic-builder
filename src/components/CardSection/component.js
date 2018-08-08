import React from 'react';
import Card from '../Card';
import styled from 'styled-components';

const cardHeight = 310;
const offset = 40;
const bottomOverlap = 10;

const StyledContainer = styled.div`
	position: relative;
`
const StyledList = styled.ol`
	margin: 0;
	padding: 0;
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
const StyledMenuHolder = styled.div`
	position: absolute;
	left: 240px;
	top: ${({index}) => (index * offset) + 10}px;
	transition: all 0.2s ease-in-out;
`


class CardSection extends React.Component {

	render(){
		const {cards, title, expanded, getMenu} = this.props;
		const isExpanded = expanded > -1 && expanded < cards.length-1;

		return <div>
			<h2>{title}</h2>
			<StyledContainer>
				<StyledList count={cards.length} expanded={isExpanded}>
					{cards.map((card, index) => 
						<StyledCard index={index} expandedBefore={expanded > -1 && expanded < index} key={card.name} onClick={() => this.props.setExpanded(index)}>
							<Card data={card} expanded={index===expanded || index === cards.length-1}/>
						</StyledCard>)}
				</StyledList>

				{getMenu && isExpanded ? <StyledMenuHolder index={expanded}>{getMenu(cards[expanded])}</StyledMenuHolder> : null }
			</StyledContainer>
		</div>
	}
}

export default CardSection