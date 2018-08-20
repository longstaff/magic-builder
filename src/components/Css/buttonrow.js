import React from 'react';
import styled from 'styled-components';
import {baseStyle} from './typography';

export const ButtonRow = styled.div`
	display: grid;
	grid-template-columns: repeat(${p=>p.children.length}, 1fr);
	grid-gap: 10px;
`

export default ButtonRow;