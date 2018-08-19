import React from 'react';
import styled from 'styled-components';
import { getCardList } from '../../utils/cache';
import CardSection from '../CardSection';
import CardMenu from '../CardMenu';
import CardBase from '../CardBase';
import {SectionTitle, TextInput, baseStyle} from '../Css';

const DEBOUNCE_TIME = 200;

const StyledCardBase = styled(CardBase)`
	margin: 40px auto 20px;
`
const StyledHiddenButton = styled.button`
	border: 1px solid white;
	border-radius: 50%;
	padding:0;
	background: #ccc;
  	width: 19px;
    height: 19px;
    box-sizing: border-box;
`
const StyledColors = styled.div`
	position:absolute;
	text-align:right;
	right: 10px;
	top: 10px;
	font-size: 0.7em;
`
const StyledTitle = styled.div`
    font-family: serif;
    font-weight: bold;
    font-size: 1.1em;
	position:absolute;
	top: 10px;
	left: 10px;
`
const StyledTypeBar = styled.div`
	position: absolute;
	display: flex;
	top: 190px;
	height: 24px;
	left: 3px;
	right: 3px;
	border: 1px solid black;
	border-radius: 4px; 
	padding: 2px 5px;
	background: rgba(255,255,255,0.5);
`
const StyledType = styled.select`
    font-size: 0.8em;
    flex-grow: 1;
    align-self: center;
`
const StyledSubType = styled.div`
    font-family: serif;
    font-size: 0.9em;
    flex-grow: 1;
    text-align: right;
    align-self: center;
`
const StyledText = styled.div`
    font-family: serif;
    font-size: 1.1em;
	position:absolute;
	top:220px;
	bottom: 10px;
	left: 5px;
	right: 5px;
	border: 1px solid rgba(0,0,0,0.5);
	padding: 6px 8px;
`

const StyledLoading = styled.p`
	${baseStyle}
	margin: 20px;
	text-align:center;
`

class FindCard extends React.Component {
	debounce;
	
	constructor(props){
		super(props);

		this.state = {
			results: [],
			expanded: -1,
			search: '',
			type: '',
			colours: props.colours || [],
			colourMatch: 'exclusive',
			searchField: 'name',
			searching: false
		}
	}

	setSearch = ev => {
		const input = ev.target;
		if(this.debounce) clearTimeout(this.debounce);
		this.setState({search: input.value});
		this.debounce = setTimeout(this.triggerSearch, DEBOUNCE_TIME);
	}
	setSearchField = ev => {
		if(this.debounce) clearTimeout(this.debounce);
		const input = ev.target;
		this.setState({searchField: input.value});
		this.debounce = setTimeout(this.triggerSearch, DEBOUNCE_TIME);
	}
	setType = ev => {
		const input = ev.target;
		if(this.debounce) clearTimeout(this.debounce);
		this.setState({type: input.value});
		this.debounce = setTimeout(this.triggerSearch, DEBOUNCE_TIME);
	}
	toggleColour = colour => {
		if(this.debounce) clearTimeout(this.debounce);
		if (this.state.colours.indexOf(colour) === -1) {
			this.setState({colours: [...this.state.colours, colour]});
		} else {
			this.setState({colours: this.state.colours.filter(col => col !== colour)});
		}
		this.debounce = setTimeout(this.triggerSearch, DEBOUNCE_TIME);
	}
	setColourMatch = ev => {
		if(this.debounce) clearTimeout(this.debounce);
		const input = ev.target;
		this.setState({colourMatch: input.value});
		this.debounce = setTimeout(this.triggerSearch, DEBOUNCE_TIME);
	}

	triggerSearch = () => {
		if(this.state.search === '') {
			this.setState({results: []});
			return;
		}
		this.setState({results: [], searching: true, expanded: 0});

		getCardList({
			search: this.state.search,
			searchField: this.state.searchField,
			type: this.state.type ? this.state.type : undefined,
			colours: this.state.colours,
			colourMatch: this.state.colourMatch,
		}).then(data => {
			this.setState({results: data, searching: false});
		});
	}

	setExpanded = expanded => this.setState({expanded})

	getMenu = card => <CardMenu
		card={card}
		cards={this.props.cards}
		addCard={this.props.addCard}
		removeCard={this.props.removeCard}
	/>

	render() {	
		return <div>
			<SectionTitle>Find a card</SectionTitle>

			<TextInput 
				value={this.state.search}
				onChange={this.setSearch}
				placeholder="Search keywords"
			/>

			<StyledCardBase 
				card={{colorIdentity:this.state.colours.map(c=>c.toUpperCase())}}
				width={290}
				height={400}
			>
				<StyledColors>
					<div>
						<StyledHiddenButton onClick={ev => this.toggleColour('w')}><span className={`ms ms-w${this.state.colours.indexOf('w') > -1 ? ' ms-cost' : ''}`}/></StyledHiddenButton>
						<StyledHiddenButton onClick={ev => this.toggleColour('u')}><span className={`ms ms-u${this.state.colours.indexOf('u') > -1 ? ' ms-cost' : ''}`}/></StyledHiddenButton>
						<StyledHiddenButton onClick={ev => this.toggleColour('b')}><span className={`ms ms-b${this.state.colours.indexOf('b') > -1 ? ' ms-cost' : ''}`}/></StyledHiddenButton>
						<StyledHiddenButton onClick={ev => this.toggleColour('r')}><span className={`ms ms-r${this.state.colours.indexOf('r') > -1 ? ' ms-cost' : ''}`}/></StyledHiddenButton>
						<StyledHiddenButton onClick={ev => this.toggleColour('g')}><span className={`ms ms-g${this.state.colours.indexOf('g') > -1 ? ' ms-cost' : ''}`}/></StyledHiddenButton>
					</div>
					<div>
						<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'exclusive'} type='radio' name='colourMatch' value='exclusive' id='colourMatch-exclusive'/>
						<label htmlFor="colourMatch-exclusive" title="Exclusive (ignore other colours)">&gt;&lt;</label>
						<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'inclusive'} type='radio' name='colourMatch' value='inclusive' id='colourMatch-inclusive'/>
						<label htmlFor="colourMatch-inclusive" title="Inclusive (Has at least one of these colours)">&lt;&gt;</label>
						<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'exact'} type='radio' name='colourMatch' value='exact' id='colourMatch-exact'/>
						<label htmlFor="colourMatch-exact" title="Exact (Has these and only these colours)">==</label>
					</div>
				</StyledColors>

				<StyledTitle>
					<input onChange={this.setSearchField} checked={this.state.searchField === 'name'} type='radio' name='searchField' value='name' id='searchField-name'/>
					<label htmlFor="searchField-name">Search in Name</label>
				</StyledTitle>
				
				<StyledTypeBar>
					<StyledType value={this.state.type} onChange={this.setType}>
						<option value="">Select type to filter</option>
						<option value="artifact">Artifact</option>
						<option value="creature">Creature</option>
						<option value="enchantment">Enchantment</option>
						<option value="instant">Instant</option>
						<option value="land">Land</option>
						<option value="planeswalker">Planeswalker</option>
						<option value="sorcery">Sorcery</option>
					</StyledType>
					<StyledSubType>
						<input onChange={this.setSearchField} checked={this.state.searchField === 'type'} type='radio' name='searchField' value='type' id='searchField-type'/>
						<label htmlFor="searchField-type">Search in Type</label>
					</StyledSubType>
				</StyledTypeBar>
				
				<StyledText>
					<input onChange={this.setSearchField} checked={this.state.searchField === 'text'} type='radio' name='searchField' value='text' id='searchField-text'/>
					<label htmlFor="searchField-text">Search in Text</label>
				</StyledText>
			</StyledCardBase>

			{
				this.state.searching ?
					<StyledLoading>
						Loading
					</StyledLoading>
					: this.state.results.length ?
					<CardSection
						title={`Results (${this.state.results.length})`}
						cards={this.state.results}
						expanded={this.state.expanded}
						setExpanded={this.setExpanded}
						getMenu={this.getMenu}
					/>
					: null
			} 
		</div>	
	}
}

export default FindCard