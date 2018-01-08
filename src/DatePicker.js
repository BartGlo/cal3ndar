import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import moment from 'moment';
import './style/DatePicker.css';
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

  };

  fetchAPIData = () => {
    const url = 'http://numbersapi.com/';
    const month = `${this.state.startMonth}/`;
    const day = `${this.state.startDay}/`;
    const dataType = 'date?json';
    const path = url+month+day+dataType;

    fetch(path)
    .then(data => {
      return data.json();
    }).then(sentence => {
      this.setState({
        text: sentence.text,
        displayData: true
      });
    });
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => {
      if (startDate && endDate){
        const startDay = this.state.startDate._d.getDate();
        const startMonth = this.state.startDate._d.getMonth()+1;

        this.calculateDaysBetweenDates(this.state.startDate, this.state.endDate);
        this.areDatesPartOfLeapYear(this.state.startDate, this.state.endDate);

        this.setState({
          startDay: startDay,
          startMonth: startMonth,
        }, () => this.fetchAPIData())
      };
    });
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  calculateDaysBetweenDates = (startDate, endDate) => {
    const daysBetweenDates = endDate.diff(startDate, 'days');
    this.setState({daysBetweenDates});
  };

  areDatesPartOfLeapYear = (startDate, endDate) => {
    const isStartLeap = startDate.isLeapYear();
    const isEndLeap = endDate.isLeapYear();
    this.setState({
      isStartLeap: isStartLeap,
      isEndLeap: isEndLeap
    });
  };

  displayInfo = () => {
    if(this.state.displayData){
      return (
        <div className={'DatePicker-info'}>
          <div>
            <p>Number of days between selected dates: <b>{this.state.daysBetweenDates}</b></p>
            <p>Is the start date a leap year: <b>{this.state.isStartLeap.toString()}</b></p>
            <p>Is the end date a leap year: <b>{this.state.isEndLeap.toString()}</b></p>
          </div>
          <div>
            <p>Random fact: <b>{this.state.text}</b></p>
          </div>
        </div>
      )
    } else {
      return '';
    }
  };

  render() {
    return (
      <div className={'DatePicker-content'}>
        <div className={'DatePicker-calendar'}>
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
            isOutsideRange={() => false}
          />
        </div>
        {this.displayInfo()}
      </div>
    );
  }
}
