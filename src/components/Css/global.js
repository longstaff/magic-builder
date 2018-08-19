 
import React from 'react';
import styled, { injectGlobal } from 'styled-components';

export const Global = injectGlobal`
	html,
	body,
	#root {
		height: 100%;
		background: #3f3f3f;
	}
`

export default Global;