import React from 'react';
import styled, {css} from 'styled-components';

export const fontStyle = css`
    font-family: sans-serif;
`
export const baseStyle = css`
	color: #EDEDED;
	${fontStyle}
`

export const PageTitle = styled.h1`
	${baseStyle}
	text-align: center;
	margin: 0;
	padding: 0;
`

export const SectionTitle = styled.h2`
	${baseStyle}
	text-align: center;
	margin: 0;
	padding: 0;
`

export const BodyTextStyles = baseStyle

