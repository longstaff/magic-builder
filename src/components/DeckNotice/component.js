import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '../../constants';

import { BaseLayout } from '../Layout'
import { SectionTitle, Button } from '../Css'

const StyledButton = styled(Button)`
	width:100%;
	margin-top:30px;
`

const DeckNotice = ({history, message, back = false}) => <BaseLayout>
		<SectionTitle>{message}</SectionTitle>
		{ back ? 
			<StyledButton onClick={() => history.push(BASE_URL)}>Back to home</StyledButton>
		 : null }
	</BaseLayout>

export default withRouter(DeckNotice)