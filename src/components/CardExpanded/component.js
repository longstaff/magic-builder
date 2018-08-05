import React from 'react';
import ProxyCard from '../ProxyCard';

const Card = ({card}) => {
	return card.imageUrl ? <img src={card.imageUrl} alt=""/> : <ProxyCard card={card}/>;
}

export default Card