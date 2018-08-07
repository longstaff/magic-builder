import React, { Component } from 'react';
import {saveData, initRepo, retrieveData} from '../../data'
import CardSection from '../CardSection';
import FindCard from '../FindCard';
import ImportList from '../ImportList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: -1,
      deck: {
        sections: [],
        cards: []
      }
    }
  }

  setExpanded = (index) => {
    this.setState({
      expanded: index
    });
  }

  componentDidMount () {
    initRepo().then(init => retrieveData());
    window.addEventListener('keyup', this.onKeyUp)
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = ev => {
    if(ev.key === 'ArrowUp') {
      this.setState({expanded: Math.max(-1, this.state.expanded -1)})
      ev.preventDefault();
    }
    else if(ev.key === 'ArrowDown') {
      this.setState({expanded: Math.min(this.state.deck.length-1, this.state.expanded + 1)})
      ev.preventDefault();
    }
  }

  setDeck = deck => {
    this.setState({deck});
  }
  addCard = card => {
    const {deck} = this.state;
    console.log('ADD CARD NOT COMPLETE, ADD SECTION CORRECTLY, REBUILD FROM CARD LIST?')

    //TODO: Add section sensibly here
    const importSection = deck.sections.find(sec => sec.title === 'Found') || {title: 'Found', cards:[]};
    importSection.cards.push(card);

    this.setDeck({
      ...deck,
      cards: deck.cards = [
        ...deck.cards,
        card.name
      ],
      sections: [
        importSection
      ]
    });
  }
  removeCard = card => {
    const {deck} = this.state;
    const ind = deck.cards.lastIndexOf(card.name);

    console.log('REMOVE CARD NOT COMPLETE, REMOVE CORRECTLY, REBUILD FROM CARD LIST?')

    //TODO: Remove from section here
    const importSection = deck.sections.find(sec => sec.title === 'Found') || {title: 'Found', cards:[]};
    importSection.cards.push(card);

    this.setDeck({
      ...deck,
      cards: deck.cards = deck.cards.filter((card, ii) => ii !== ind),
      sections: [
        importSection
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <ImportList completeImport={this.setDeck} />
        <ul>
          {this.state.deck.sections.map((section, index, arr) => {
            const offset = arr.slice(0, index).reduce((prev, next) => prev + next.cards.length, 0);
            return <li key={section.title}><CardSection
              title={section.title}
              expanded={this.state.expanded - offset}
              setExpanded={index => this.setExpanded(offset + index)}
              cards={section.cards}
            /></li>
          })}
        </ul>

        <FindCard deck={this.state.deck} addCard={this.addCard} removeCard={this.removeCard}/>
      </div>
    );
  }
}

export default App;
