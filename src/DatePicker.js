import 'react-dates/initialize';
import React, { Component } from 'react';
import logo from './logo.svg';
import { DateRangePicker} from 'react-dates';
import './style/App.css';
import moment from 'moment';



export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    var SelectedStartDate = moment('2017-05-05');
    var SelectedEndDate = moment('2017-05-09');
    this.state = {
      text: '',
      focusedInput: null,
      startDate: SelectedStartDate,
      endDate:SelectedEndDate
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

    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome tadssadassado React</h1>
        </header>

        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          //Here is the change:
          date={startDate}
          startDate={startDate}
          endDate={endDate}
        />

        {this.state.text}
      </div>
    );
  }
}
