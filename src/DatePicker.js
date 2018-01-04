import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';

export default class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  componentDidMount() {
    const url = 'http://numbersapi.com/';
    const month = '4/';
    const day = '2/';
    const dataType = 'date?json';
    const path = url+month+day+dataType;

    fetch(path)
    .then(data => {
      return data.json();
    }).then(sentence => {
      this.setState({text: sentence.text});
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome tadssadassado React</h1>
        </header>

        {this.state.text}
      </div>
    );
  }
}
