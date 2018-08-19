import React from 'react';
import styled from 'styled-components';

export const ModalBox = styled.div`
	position: fixed;
	top:20px;
	left:20px;
	bottom:20px;
	right:20px;
	background:#2f2f2f;
	border-radius:5px;
	z-index:100;
	padding: 20px;
	overflow-y: auto;
`
export const ModalOverlay = styled.div`
	position: fixed;
	top:0;
	left:0;
	bottom:0;
	right:0;
	background:rgba(0,0,0,0.6);
	z-index:100;
`