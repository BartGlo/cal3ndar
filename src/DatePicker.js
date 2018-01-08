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
      endDate: moment(),
      daysBetweenDates: '',
      isStartLeap: '',
      isEndLeap: ''
    };

  }
  fetchAPIData = () => {
    const url = 'http://numbersapi.com/';
    const month = `${this.state.startMonth}/`;
    const day = `${this.state.startDay}/`;
    const dataType = 'date?json';
    const path = url+month+day+dataType;

    console.log(this.state);
    fetch(path)
    .then(data => {
      return data.json();
    }).then(sentence => {
      this.setState({text: sentence.text});
    });
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => {
      if (startDate && endDate){
        const startYear = this.state.startDate._d.getFullYear();
        const startDay = this.state.startDate._d.getDate();
        const startMonth = this.state.startDate._d.getMonth()+1;
        console.log('START full year', startYear);
        console.log('START date day', startDay);
        console.log('START month', startMonth);
        const endYear = this.state.endDate._d.getFullYear();
        const endDay = this.state.endDate._d.getDate();
        const endMonth = this.state.endDate._d.getMonth()+1;
        console.log('END full year', endYear);
        console.log('END date day', endDay);
        console.log('END month', endMonth);
        //Number of days between the date range
        const a = this.state.startDate;
        const b = this.state.endDate;
        const daysBetweenDates = b.diff(a, 'days');
        console.log('equals', daysBetweenDates);
        //--------------------------------
        //Leap year
        console.log('is start date a leap year?', a.isLeapYear());
        const isStartLeap = a.isLeapYear();
        console.log('is end date a leap year?', b.isLeapYear());
        const isEndLeap = b.isLeapYear();
        //---------------------------------
        this.setState({
          startDay: startDay,
          startMonth: startMonth,
          startYear: startYear,
          endDay: endDay,
          endMonth: endMonth,
          endYear: endYear,
          daysBetweenDates: daysBetweenDates,
          isStartLeap: isStartLeap,
          isEndLeap: isEndLeap
        }, () => this.fetchAPIData())
      }
    });
  }

onFocusChange = (focusedInput) => {
  this.setState({ focusedInput });
}

areDatesPartOfLeapYear = () => {

}


render() {
  return (
    <div >
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.state.focusedInput}
          startDateId= {'startDate'}
          startDatePlaceholderText= {'DD/MM/YYYY'}
          endDateId= {'endDate'}
          endDatePlaceholderText={'DD/MM/YYYY'}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          noBorder= {true}
          firstDayOfWeek= {1}
          displayFormat = {'DD/MM/YYYY'}
          isOutsideRange={() => false} //choose any date
        />
      </div>
      <div>
        <p>Number of days between selected dates: {this.state.daysBetweenDates}</p>
        <p>Is the start date a leap year: {this.state.isStartLeap.toString()}</p>
        <p>Is the end date a leap year: {this.state.isEndLeap.toString()}</p>
      </div>
      <div>
        <p>Random fact: {this.state.text}</p>
      </div>
    </div>
  );
  }
}
