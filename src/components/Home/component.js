import React from 'react';
import CardSection from '../CardSection';
import { Link } from 'react-router-dom';

class DeckView extends React.Component {

	render(){
		return <div>
			<Link to='/deck/slug'>See a deck</Link>

			<p> OR </p>

			<Link to='/create'>Make a new one</Link>
		</div>
	}
}

export default DeckView