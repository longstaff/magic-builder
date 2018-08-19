import React from 'react';
import Card from '../Card';
import styled from 'styled-components';
import { SectionTitle } from '../Css'

const cardHeight = 310;
const offset = 40;
const bottomOverlap = 10;

const StyledWrapper = styled.div`
	margin-top: 20px;
`
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
    left: 50%;
    margin-left: -112px;
`
const StyledMenuHolder = styled.div`
	position: absolute;
	left: 50%;
	margin-left: 120px;
	top: ${({index}) => (index * offset) + 10}px;
	transition: all 0.2s ease-in-out;
`
const StyledTitle = styled(SectionTitle)`
	margin-bottom: 20px;
`

class CardSection extends React.Component {

	render(){
		const {cards, title, expanded, getMenu} = this.props;
		const isExpanded = expanded > -1 && expanded < cards.length;
		const expandHeight = expanded > -1 && expanded < cards.length - 1;

		return <StyledWrapper>
			<StyledTitle>{title}</StyledTitle>
			<StyledContainer>
				<StyledList count={cards.length} expanded={expandHeight}>
					{cards.map((card, index) => 
						<StyledCard index={index} expandedBefore={expanded > -1 && expanded < index} key={`${index}-${card.name}`} onClick={() => this.props.setExpanded(index)}>
							<Card data={card} expanded={index===expanded || index === cards.length-1}/>
						</StyledCard>)}
				</StyledList>

				{getMenu && isExpanded ? <StyledMenuHolder index={expanded}>{getMenu(cards[expanded])}</StyledMenuHolder> : null }
			</StyledContainer>
		</StyledWrapper>
	}
}

export default CardSection