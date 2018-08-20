import React from 'react';
import styled from 'styled-components'
import { Button, ModalBox, ModalOverlay, TextArea } from '../Css';

const StyledHolder = styled.div`
	margin: 20px 0;
`
const StyledButton = styled(Button)`
	width:100%;
`
const StyledCloseButton = styled(Button)`
	margin-top:20px;
	width:100%;
`

class ImportList extends React.Component {
	text = null

	constructor(props) {
		super(props);
		this.state = {
			setScrollFreeze: false
		}
	}

	importCards = () => {
		this.setState({searching: true})
		if (this.props.setScrollFreeze) this.props.setScrollFreeze(true)
	}
	completeImportCards = () => {
		this.setState({searching: false})
		if (this.props.setScrollFreeze) this.props.setScrollFreeze(false)
	}

	parseFields = input => (
		input.split(/\n/g).map(line => {
			const results = /(\d+)x (.+?)(#.+)?( \*CMDR\*)?$/.exec(line);
			const output = [];

			if(results) {
				const count = +results[1];
				const name = results[2];

				for (let i = 0; i < count; i++) {
					output.push({name: name, commander: !!results[4]});
				}
			}
			return output;
		}).reduce((all, next) => [...all, ...next], [])
	)

	onSubmit = () => {
		this.props.completeImport(this.parseFields(this.text.value));
		this.completeImportCards();
	}

	render() {
		const {searching} = this.state;

		return <StyledHolder>
			<StyledButton onClick={this.importCards}>Import from TO file</StyledButton>
			{searching ? <ModalOverlay>
				<ModalBox>
					<TextArea ref={node =>this.text = node}></TextArea>
					<StyledButton onClick={this.onSubmit}>Import</StyledButton>
					<StyledCloseButton onClick={this.completeImportCards}>Cancel</StyledCloseButton>
				</ModalBox>
			</ModalOverlay> : null}
		</StyledHolder>
	}
}

export default ImportList