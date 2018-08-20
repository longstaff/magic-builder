import React from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import EditList from '../EditList'
import EditDeck from '../EditDeck'
import ImportList from '../ImportList';
import { initRepo, saveState, checkSlug } from '../../data'
import { BASE_URL } from '../../constants';

import { BaseLayout } from '../Layout';
import { Button } from '../Css';

const StyledBaseLayout = styled(BaseLayout)`
	overflow: ${props => props.scrollFreeze ? 'hidden' : 'auto'};
`
const StyledButton = styled(Button)`
	width: 100%;
	margin-top: 30px;
`

class DeckNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			config: {},
			cards: [],
			expanded: -1,
			scrollFreeze: false
		}
	}
	componentDidMount() {
		initRepo();
	}

	setImport = cards => {
		this.setState({cards});
	}

	commit = () => {
		const name = this.state.config.name
		if (!name) {
			alert('Must have a name');
			return
		}

		const newSlug = name.replace(/\s/g, '-');
		checkSlug(newSlug).then(used => {
			if (used) {
				alert('duplicate name found, use a different one');
				return
			}
			saveState(newSlug, 'initial commit', {config: this.state.config, main: this.state.cards})
				.then(() => this.props.history.push(`${BASE_URL}deck/${newSlug}/`));
		})
	}
	setScrollFreeze = (scrollFreeze) => {
		this.setState({scrollFreeze})
	}

	render(){
		const {config, cards} = this.state;

		return <StyledBaseLayout>
			<EditDeck config={config} setConfig={config => this.setState({config})}/>
			<ImportList completeImport={this.setImport} setScrollFreeze={this.setScrollFreeze}/>
			<EditList cards={cards} setCards={cards => this.setState({cards})} setScrollFreeze={this.setScrollFreeze}/>
			
			<StyledButton onClick={this.commit}>Save</StyledButton> 
		</StyledBaseLayout>
	}
}

export default withRouter(DeckNew)