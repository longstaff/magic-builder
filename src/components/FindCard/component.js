import React from 'react';
import { getCardList } from '../../utils/cache';
import CardSection from '../CardSection';

const DEBOUNCE_TIME = 200;

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
			searchField: 'name'
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

		getCardList({
			search: this.state.search,
			searchField: this.state.searchField,
			type: this.state.type ? this.state.type : undefined,
			colours: this.state.colours,
			colourMatch: this.state.colourMatch,
		}).then(data => {
			this.setState({results: data});
		});
	}

	setExpanded = expanded => this.setState({expanded})

	render() {	
		return <div>
			<input 
				value={this.state.search}
				onChange={this.setSearch}
			/>

			<input onChange={this.setSearchField} checked={this.state.searchField === 'name'} type='radio' name='searchField' value='name' id='searchField-name'/>
			<label htmlFor="searchField-name">Name</label>
			
			<input onChange={this.setSearchField} checked={this.state.searchField === 'text'} type='radio' name='searchField' value='text' id='searchField-text'/>
			<label htmlFor="searchField-text">Text</label>
			
			<input onChange={this.setSearchField} checked={this.state.searchField === 'type'} type='radio' name='searchField' value='type' id='searchField-type'/>
			<label htmlFor="searchField-type">Type</label>

			<select value={this.state.type} onChange={this.setType}>
				<option value="">Select type to filter</option>
				<option value="artifact">Artifact</option>
				<option value="creature">Creature</option>
				<option value="enchantment">Enchantment</option>
				<option value="instant">Instant</option>
				<option value="land">Land</option>
				<option value="planeswalker">Planeswalker</option>
				<option value="sorcery">Sorcery</option>
			</select>

			<div>
				<button onClick={ev => this.toggleColour('w')}><span className={`ms ms-w${this.state.colours.indexOf('w') > -1 ? ' ms-cost' : ''}`}/></button>
				<button onClick={ev => this.toggleColour('u')}><span className={`ms ms-u${this.state.colours.indexOf('u') > -1 ? ' ms-cost' : ''}`}/></button>
				<button onClick={ev => this.toggleColour('b')}><span className={`ms ms-b${this.state.colours.indexOf('b') > -1 ? ' ms-cost' : ''}`}/></button>
				<button onClick={ev => this.toggleColour('r')}><span className={`ms ms-r${this.state.colours.indexOf('r') > -1 ? ' ms-cost' : ''}`}/></button>
				<button onClick={ev => this.toggleColour('g')}><span className={`ms ms-g${this.state.colours.indexOf('g') > -1 ? ' ms-cost' : ''}`}/></button>
			</div>

			
			<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'exclusive'} type='radio' name='colourMatch' value='exclusive' id='colourMatch-exclusive'/>
			<label htmlFor="colourMatch-exclusive">Exclusive (ignore other colours)</label>
			
			<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'inclusive'} type='radio' name='colourMatch' value='inclusive' id='colourMatch-inclusive'/>
			<label htmlFor="colourMatch-inclusive">Inclusive (Has at least one of these colours)</label>
			
			<input onChange={this.setColourMatch} checked={this.state.colourMatch === 'exact'} type='radio' name='colourMatch' value='exact' id='colourMatch-exact'/>
			<label htmlFor="colourMatch-exact">Exact (Has these and only these colours)</label>

			{
				this.state.results.length ?
					<CardSection
						title={`Results (${this.state.results.length})`}
						cards={this.state.results}
						expanded={this.state.expanded}
						setExpanded={this.setExpanded}
					/>
					: null
			} 
		</div>	
	}
}

export default FindCard