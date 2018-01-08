import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
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
      daysBetweenDates: '',
      isStartLeap: '',
      isEndLeap: ''
    };
  };

  getFactAboutDay = () => {
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
    }).catch(error => {
      this.setState({
        text: 'An unexpected error occured, try again',
        displayData: true
      })
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
        }, () => this.getFactAboutDay())
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
            {this.state.isStartLeap ? (
              <p>Start date <b>IS a part of a leap year.</b></p>
            ) : (
              <p>Start date <b>IS NOT a part of a leap year.</b></p>
            )  }

            {this.state.isEndLeap ? (
              <p>End date <b>IS a part of a leap year.</b></p>
            ) : (
              <p>End date <b>IS NOT a part of a leap year.</b></p>
            )  }
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
          <div className={'DatePicker-instructions'}>
            <p>You can enter dates either by typing in dates in format <b>'DD/MM/YYYY'</b> (please provide slashes - / ) or
            by using provided calendar that opens automatically after clicking on the input field.</p>
          </div>
          <br/>
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
            numberOfMonths= {1}
          />
        </div>
        {this.displayInfo()}
      </div>
    );
  }
}
