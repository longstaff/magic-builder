import React from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';

import { getDeckList } from '../../data/'
import CardSection from '../CardSection'
import { BaseLayout } from '../Layout'
import { Button } from '../Css'

const FullButton = styled(Button)`
	width: 100%;
	margin-bottom: 20px;
`

class DeckView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			expanded: 0
		}
	}

	componentDidMount() {
		getDeckList().then(list => this.setState({list}));
	}

	expandCard = expanded => {
		if (expanded === this.state.expanded) {
			const target = this.state.list[expanded];
			this.props.history.push(`/deck/${target.slug}`);
		} else {
			this.setState({expanded})
		}
	}

	render(){

		const { list } = this.state;

		return <BaseLayout>
			<FullButton onClick={() => this.props.history.push('/deck/')}>Make a new deck</FullButton>

			<CardSection 
				title={`View saved lists (${list.length})`}
				expanded={this.state.expanded}
				setExpanded={this.expandCard}
				cards={list.map(summary => ({
					proxyOnly: true,
					name: summary.name[0].toUpperCase() + summary.name.slice(1),
					colorIdentity: summary.colours,
					manaCost: summary.colours.reduce((old, col) => `${old}{${col.toLowerCase()}}`, ''),
					type: 'Deck - Commander',
					text: summary.description.length < 285 ? summary.description : `${summary.description.slice(0, 285)}...`,
				}))}
			/>
		</BaseLayout>
	}
}

export default withRouter(DeckView)