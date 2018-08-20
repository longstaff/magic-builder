import React from 'react';
import styled from 'styled-components';
import { ButtonRow, Button, ModalBox, ModalOverlay, TextArea, SectionTitle } from '../Css';

const StyledTextArea = styled(TextArea)`
	margin: 30px 0;
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

		return <ModalOverlay>
			<ModalBox>
				<SectionTitle>Save changes</SectionTitle>
				{this.props.added ? <div><SectionTitle>Added</SectionTitle><ul>{this.props.added.map((card, ind) => <li key={ind}>{card.name}</li>)}</ul></div> : null}
				{this.props.removed ? <div><SectionTitle>Removed</SectionTitle><ul>{this.props.removed.map((card, ind) => <li key={ind}>{card.name}</li>)}</ul></div> : null}

				<StyledTextArea onChange={ev => this.setState({description: ev.target.value})} placeholder="change description"/>
				
				<ButtonRow>
				    <Button onClick={this.cancel}>Cancel</Button> 
				    <Button onClick={this.commit}>Save</Button>
			    </ButtonRow>
			</ModalBox>
		</ModalOverlay>
	}
}

export default CommitModal