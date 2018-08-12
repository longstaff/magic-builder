import React from 'react';
import { Link } from 'react-router-dom';
import { getDeckList } from '../../data/'

class DeckView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		getDeckList().then(list => this.setState({list}));
	}

	render(){

		const { list } = this.state;

		return <div>
			<Link to='/create'>Make a new one</Link>

			<p> OR </p>
			<ul>
				{list.map((slug => <li key={slug}><Link to={`/deck/${slug}`}>{slug}</Link></li>))}
			</ul>

		</div>
	}
}

export default DeckView