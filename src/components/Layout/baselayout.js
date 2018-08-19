import React from 'react';
import styled from 'styled-components';
import { BasePage, Header, Footer, Content, PageTitle } from '../Css';

const StyledBasePageGrid = styled(BasePage)`
	display: grid;
	grid-template-rows: min-content 1fr min-content;
    height: 100%;
`


export const BaseLayout = props => (
	<StyledBasePageGrid>
		<Header>
			<PageTitle>{props.title ? props.title : 'Chronicler'}</PageTitle>
		</Header>
		<Content>
			{props.children}
		</Content>
		<Footer/>
	</StyledBasePageGrid>
)

export default BaseLayout;