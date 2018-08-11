import React from 'react';
import { getHistory } from '../../data/git'

import CardSection from '../CardSection';

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
		return commits ? <ul>
			{commits.map(commit => (<li key={commit.oid}>
				<div>
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
				</div>
			</li>))}
		</ul> : null;
	}
}

export default History