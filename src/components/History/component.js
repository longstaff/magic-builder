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
			commits: [],
			index: 0,
			expanded: -1,
		}
	}

	componentDidMount() {
		getHistory().then(commits => {
			this.setState({commits});
		})
	}

	setExpanded = expanded => this.setState({ expanded })

	render () {
		const { commits, index, expanded } = this.state;
		const commit = commits[index];

		return <div>
			<ol>
				{commits.map((com, ind) => <li key={ind}><a onClick={() => this.setState({index: ind})}>{ind === index ? 'x' : 'o'}</a></li>)}
			</ol>
			
			{
				commit ? <div>
					<h3>{commit.message}</h3>
					{commit.diff.added.length ? <CardSection
						title={`+ Added (${commit.diff.added.length})`}
						expanded={this.state.expanded}
						setExpanded={index => this.setExpanded(index)}
						cards={commit.diff.added}
						/> : null}
					{commit.diff.removed.length ? <CardSection
						title={`- Removed (${commit.diff.removed.length})`}
						expanded={this.state.expanded - commit.diff.added.length}
						setExpanded={index => this.setExpanded(index + commit.diff.added.length)}
						cards={commit.diff.removed}
						/> : null}
				</div> : null
			}
		</div>
	}
}

export default History