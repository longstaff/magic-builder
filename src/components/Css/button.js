import React from 'react';
import styled from 'styled-components';
import {baseStyle} from './typography';

export const Button = styled.button`
    ${baseStyle}
    border: 1px solid black;
    background: #2f2f2f;
    padding: 10px 15px;
    border-radius: 5px;
`

export default Button;