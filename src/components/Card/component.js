import React from 'react';
import { getCard } from '../../utils/cache';
import CardProxy from '../CardProxy';
import CardExpanded from '../CardExpanded';

class Card extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			card: null,
		}
	}

	componentDidMount() {
		const {data} = this.props;

		if(data.proxyOnly) {
			this.setState({loaded: true, card: data})
		} else {
			getCard({name: data.name}).then(card => this.setState({loaded: true, card}))
		}
	}

	render(){
		const {loaded, card} = this.state;
		const {expanded, data} = this.props;

		return loaded ?
			expanded && !card.proxyOnly ? 
				<CardExpanded card={card} name={data.name}/> : <CardProxy card={card}/>
			: <CardProxy card={{name: data.name}}/>;
	}
}

export default Card