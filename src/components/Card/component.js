import React from 'react';
import { getCard } from '../../utils/cache';
import ProxyCard from '../ProxyCard';
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
		getCard({name: data.name}).then(card => this.setState({loaded: true, card}))
	}

	render(){
		const {loaded, card} = this.state;
		const {expanded, data} = this.props;

		return loaded ?
			expanded ? 
				<CardExpanded card={card} name={data.name}/> : <ProxyCard card={card}/>
			: <ProxyCard card={{name: data.name}}/>;
	}
}

export default Card