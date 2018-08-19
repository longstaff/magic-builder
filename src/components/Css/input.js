import React from 'react';
import styled from 'styled-components';
import {fontStyle} from './typography';

export const TextInput = styled.input`
    ${fontStyle}
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 5px;
    color: #2f2f2f;
    background: #C2C2C2;
    display: block;
    margin: 10px 0;
    width: fill-available;
`
export const TextArea = styled.textarea`
    ${fontStyle}
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 5px;
    color: #2f2f2f;
    background: #C2C2C2;
    display: block;
    margin: 10px 0;
    width: fill-available;
`