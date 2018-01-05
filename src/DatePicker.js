import 'react-dates/initialize';
import React, { Component } from 'react';
import { DateRangePicker} from 'react-dates';
import './style/App.css';

import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import 'react-dates/lib/css/_datepicker.css';

ThemedStyleSheet.registerTheme(DefaultTheme);

export default class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);

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

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      console.log(startDate);
      console.log(endDate);
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    return (
      <div >
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.state.focusedInput}
          date={this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />

        <p>
          {this.state.text}
        </p>
      </div>
    );
  }
}
