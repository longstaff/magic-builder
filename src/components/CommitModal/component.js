import React from 'react';
import styled from 'styled-components';

const StyledOverlay = styled.div`
	position: fixed;
	z-index: 100;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #cccccccc;
`
const StyledModal = styled.div`
	position: absolute;
	top: 20px;
	bottom: 20px;
	left: 10px;
	right: 10px;
	overflow-x: auto;
	background: white;
	padding: 20px;
`

class CommitModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			description: '',
		}
	}

	commit = () => {
		this.props.commit(this.state.description);
	}
	cancel = () => {
		this.props.cancel();
	}

	render() {
		const { config, cards, loaded, error } = this.state;

		return <StyledOverlay>
			<StyledModal>
				<h1>Save changes</h1>
				{this.props.added ? <div><h2>Added</h2><ul>{this.props.added.map((card, ind) => <li key={ind}>{card.name}</li>)}</ul></div> : null}
				{this.props.removed ? <div><h2>Removed</h2><ul>{this.props.removed.map((card, ind) => <li key={ind}>{card.name}</li>)}</ul></div> : null}

				<textarea onChange={ev => this.setState({description: ev.target.value})} placeholder="change description"/>
				
			    <button onClick={this.cancel}>Cancel</button> 
			    <button onClick={this.commit}>Save</button> 
			</StyledModal>
		</StyledOverlay>
	}
}

export default CommitModal