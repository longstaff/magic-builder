import React from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';

import { getDeckList } from '../../data/'
import { BASE_URL } from '../../constants'
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
			this.props.history.push(`${BASE_URL}deck/${target.slug}`);
		} else {
			this.setState({expanded})
		}
	}

	render(){

		const { list } = this.state;

		return <BaseLayout>
			<FullButton onClick={() => this.props.history.push(`${BASE_URL}deck/`)}>Make a new deck</FullButton>

			<CardSection 
				title={`View saved lists (${list.length})`}
				expanded={this.state.expanded}
				setExpanded={this.expandCard}
				cards={list.map(summary => {
					const name = summary.title ? summary.title[0].toUpperCase() + summary.title.slice(1) : 'Untitled';
					const manaCost = summary.colours ? summary.colours.reduce((old, col) => `${old}{${col}}`, '') : '';
					const text = summary.description ? summary.description.length < 285 ? summary.description : `${summary.description.slice(0, 285)}...` : 'No description'

					return {
						proxyOnly: true,
						name,
						colorIdentity: summary.colours,
						manaCost,
						type: 'Deck - Commander',
						text,
					}
				})}
			/>
		</BaseLayout>
	}
}

export default withRouter(DeckView)