import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { BasePage, Header, Footer, Content, PageTitle } from '../Css';

const StyledBasePageGrid = styled(BasePage)`
	display: grid;
	grid-template-rows: min-content 1fr min-content;
    height: 100%;
`
const StyledLink = styled.a`
	text-decoration: none;
	color: inherit;
`

export const BaseLayout = ({title, children, history, ...props}) => (
	<StyledBasePageGrid {...props}>
		<Header>
			<PageTitle><StyledLink href="#" onClick={ev => {
				ev.preventDefault();
				history.push(BASE_URL)
			}}>{title ? title : 'Chronicler'}</StyledLink></PageTitle>
		</Header>
		<Content>
			{children}
		</Content>
		<Footer/>
	</StyledBasePageGrid>
)

export default withRouter(BaseLayout);