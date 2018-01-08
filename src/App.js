import React, { Component } from 'react';
import DatePicker from './DatePicker';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <DatePicker />
        <Footer />
      </div>
    );
  }
}
