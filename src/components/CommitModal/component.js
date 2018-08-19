import React from 'react';
import styled from 'styled-components';
import { Button, ModalBox, ModalOverlay, TextArea, SectionTitle } from '../Css';

const StyledButtonHolder = styled.div`
	display: flex;
`
const StyledButton = styled(Button)`
	margin: 0 10px;
	flex-grow: 1;
`
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
				
				<StyledButtonHolder>
				    <StyledButton onClick={this.cancel}>Cancel</StyledButton> 
				    <StyledButton onClick={this.commit}>Save</StyledButton>
			    </StyledButtonHolder>
			</ModalBox>
		</ModalOverlay>
	}
}

export default CommitModal