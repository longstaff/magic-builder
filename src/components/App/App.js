import React, { Component } from 'react';
import {saveData, initRepo, retrieveData} from '../../data'
import CardSection from '../CardSection';
import ImportList from '../ImportList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: -1,
      deck: {
        sections: []
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
      </div>
    );
  }
}

export default App;
