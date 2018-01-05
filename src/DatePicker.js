import 'react-dates/initialize';
import React, { Component } from 'react';
import { DateRangePicker} from 'react-dates';
import './style/App.css';
import moment from 'moment';

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
      startDate: moment(),
      endDate: moment()
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);

  }
  fetchAPIData() {
    const url = 'http://numbersapi.com/';
    const month = `${this.state.startMonth}/`;
    const day = `${this.state.startDay}/`;
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
      if (startDate && endDate){
        const nowe1 = this.state.startDate._d.getFullYear();
        const nowe2 = this.state.startDate._d.getDate();
        const nowe3 = this.state.startDate._d.getMonth()+1;
        console.log('START full year', nowe1);
        console.log('START date day', nowe2);
        console.log('START month', nowe3);
        const nowe4 = this.state.endDate._d.getFullYear();
        const nowe5 = this.state.endDate._d.getDate();
        const nowe6 = this.state.endDate._d.getMonth()+1;
        console.log('END full year', nowe4);
        console.log('END date day', nowe5);
        console.log('END month', nowe6);
        //Number of days between the date range
        const a = this.state.startDate;
        const b = this.state.endDate;
        const equalss = b.diff(a, 'days');
        console.log('equals', equalss);
        //--------------------------------
        this.setState({
          startDay: nowe2,
          startMonth: nowe3,
          startYear: nowe1,
          endDay: nowe5,
          endMonth: nowe6,
          endYear: nowe4
        }, () => this.fetchAPIData())
      }
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput }, () => {
    });
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

        <p>{this.state.text}</p>
      </div>
    );
  }
}
