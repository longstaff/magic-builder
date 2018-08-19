import React from 'react';
import styled from 'styled-components';
import { BasePage, Header, Footer, Content, PageTitle } from '../Css';

const StyledBasePageGrid = styled(BasePage)`
	display: grid;
	grid-template-rows: min-content 1fr min-content;
    height: 100%;
`

export const BaseLayout = ({title, children, ...props}) => (
	<StyledBasePageGrid {...props}>
		<Header>
			<PageTitle>{title ? title : 'Chronicler'}</PageTitle>
		</Header>
		<Content>
			{children}
		</Content>
		<Footer/>
	</StyledBasePageGrid>
)

export default BaseLayout;