import React from 'react';
import styled, { css } from 'styled-components';

import { getHistory } from '../../data/git'
import CardSection from '../CardSection';

const PADDING = 10;
const WIDTH = 20;

const StyledWrapper = styled.div`
	margin:0;
	padding:0;
	width: 100%;
	overflow-x: auto;
`
const StyledHistoryList = styled.ul`
	margin:0 auto;
	padding:0;
	list-style:none;
	width:${props => props.count * (WIDTH + (PADDING*2)) - (PADDING*2)}px;

	background: #fff;	
    background: linear-gradient(0deg, transparent, #353535, transparent);
    background-position: 50%;
    background-repeat: repeat-x;
    background-size: auto 3px;
`
const StyledHistoryListItem = styled.li`
	margin:0;
	padding:0;
	list-style:none;
	display: inline-block;
	padding: 0 ${PADDING}px;

	&:first-child {
		padding-left: 0;
	}
	&:last-child {
		padding-right: 0;
	}
`

const HistoryListNode = css`
	box-sizing: border-box;
	display: block;
	border: 2px solid black;
	border-radius: 50%;
	background: white;
	cursor: pointer;
	width: ${WIDTH}px;
	height: ${WIDTH}px;
`
const StyledHistoryListNode = styled.a`
	${HistoryListNode}
`
const StyledHistoryListNodeActive = styled.a`
	${HistoryListNode}
	background: black;
`

class HistoryList extends React.Component {

	render () {
		const { commits, index, setIndex } = this.props;

		return <StyledWrapper>
			<StyledHistoryList count={commits.length}>
				{commits.map((com, ind) => 
					<StyledHistoryListItem key={ind}>
						{ind === index ? <StyledHistoryListNodeActive/> : <StyledHistoryListNode onClick={() => setIndex(ind)}/>}
					</StyledHistoryListItem>
				)}
			</StyledHistoryList>
		</StyledWrapper>
	}
}

export default HistoryList