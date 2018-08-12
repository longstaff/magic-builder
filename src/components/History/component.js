import React from 'react';
import styled from 'styled-components';

import { getHistory } from '../../data/git'
import CardSection from '../CardSection';

const StyledHistoryList = styled.ul`
	margin:0;
	padding:0;
	list-style:none;
`
const StyledHistoryListItem = styled.li`
	margin:0;
	padding:0;
	list-style:none;
`

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commits: null
		}
	}

	componentDidMount() {
		getHistory().then(commits => {
			this.setState({commits});
		})
	}

	render () {
		const { commits } = this.state;
		return commits ? <StyledHistoryList>
			{commits.map(commit => (<StyledHistoryListItem key={commit.oid}>
				<h3>{commit.message}</h3>
				{commit.diff.added.length ? <CardSection
					title={'Added'}
					expanded={-1}//this.state.expanded - offset}
					setExpanded={()=>{}}//index => this.setExpanded(offset + index)}
					cards={commit.diff.added}
					/> : null}
				{commit.diff.removed.length ? <CardSection
					title={'Removed'}
					expanded={-1}//this.state.expanded - offset}
					setExpanded={()=>{}}//index => this.setExpanded(offset + index)}
					cards={commit.diff.removed}
					/> : null}
			</StyledHistoryListItem>))}
		</StyledHistoryList> : null;
	}
}

export default History