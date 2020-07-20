import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Calendar from './components/Calendar.jsx';
import Guests from './components/Guests.jsx';
import BestDeals from './components/BestDeals.jsx';
import AllDeals from './components/AllDeals.jsx';
import moment from 'moment';
import getDataFromServer from './lib/getDataFromServer.js';
import getUpdatedDataFromServer from './lib/getUpdatedDataFromServer.js';
import styled from 'styled-components';
import {MainWrapper, AppWrapper, HeaderWrapper, HeaderTextBlock, HeaderIconSpan, HeaderTextSpan, CalendarGuestsWrapper, DatePickerWrapper, GuestsWrapper, GuestsButton, GuestsButtonDiv, GuestsButtonIconSpan, GuestsButtonPickerSpan, GuestsButtonPickerSpanGuestsSpan, GuestsButtonPickerSpanGuestsConfigSpan, GuestsButtonPickerSpanGuestsConfigInnerSpan, DatePickerButton, DatePickerButtonDiv, DatePickerButtonDivIconSpan, DatePickerButtonDivFieldSpan, DatePickerButtonDivFieldSpanCheckIn, DatePickerButtonDivFieldSpanDate,
  BestDealsWrapper, DealsWrapper} from './AppStyles.js';

import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      calendarView: false,
      guestsView: false,
      currentHotel: [],
      checkIn: false,
      checkOut: false,
    };
    this.getData = this.getData.bind(this);
    this.getUpdatedData = this.getUpdatedData.bind(this);
    this.calculateAvrgRate = this.calculateAvrgRate.bind(this);
    this.renderCalendar = this.renderCalendar.bind(this);
    this.changeCalendarView = this.changeCalendarView.bind(this);
    this.renderGuests = this.renderGuests.bind(this);
    this.changeGuestsView = this.changeGuestsView.bind(this);
  }

  componentDidMount () {
    this.getData('63');
  }

  getData (term) {
    const response = getDataFromServer(term);
    response.then((hotel) => {
      console.log(hotel);
      this.setState({
        currentHotel: hotel
      });
    });
  }

  getUpdatedData (...args) {
    let query = [...args][0];
    query.id = this.state.currentHotel[0].id;
    if (query.checkIn) {
      this.setState({
        checkIn: query.checkIn,
        checkOut: query.checkOut
      });
    }
    if (!query.guestsNumber) {
      query.guestsNumber = 2;
    }
    if (!query.roomsNumber) {
      query.roomsNumber = 1;
    }
    if (!query.checkIn) {
      if (!this.state.checkIn) {
        query.checkIn = moment().format('YYYY-MM-DD');
      } else {
        query.checkIn = this.state.checkIn;
      }
    }
    if (!query.checkOut) {
      if (!this.state.checkOut) {
        query.checkOut = moment().add(1, 'day').format('YYYY-MM-DD');
      } else {
        query.checkOut = this.state.checkOut;
      }
    }
    const response = getUpdatedDataFromServer(query);
    response.then((hotel) => {
      if (hotel[0]['err_msg']) {
        console.log(hotel[0]['err_msg']);
      } else {
        if (this.state.calendarView) {
          this.setState({
            currentHotel: hotel,
            calendarView: false,
            guestsView: !this.state.guestsView
          });
        } else {
          this.setState({
            currentHotel: hotel,
            guestsView: false
          });
        }
      }
    });
  }

  calculateAvrgRate () {
    if (!this.state.currentHotel[0]) {
      return 'Loading...';
    } else {
      const prices = [{price:10},{price:100}];//this.state.currentHotel[0].prices;
      let smallest = prices[0];
      let biggest = prices[1];
      for (let i = 0; i < prices.length; i++) {
        if (prices[i].price) {
          if (prices[i].price < smallest) {
            smallest = prices[i].price;
          }
          if (prices[i].price > biggest) {
            biggest = prices[i].price;
          }
        }
      }
      return `$${smallest.price} - $${biggest.price}`;
    }
  }

  changeCalendarView () {
    this.setState({
      calendarView: !this.state.calendarView
    });
  }

  renderCalendarBasics () {
    return (
      <div>
        <DatePickerButton onClick={this.changeCalendarView}>
          <DatePickerButtonDiv color="green">

            <DatePickerButtonDivIconSpan>
              <FontAwesomeIcon icon={faCalendarAlt}/>
            </DatePickerButtonDivIconSpan>

            <DatePickerButtonDivFieldSpan>
              <DatePickerButtonDivFieldSpanCheckIn>
                  Check In
              </DatePickerButtonDivFieldSpanCheckIn>
              <DatePickerButtonDivFieldSpanDate>
                <span>{moment().format('ddd')}, {moment().format('MM/DD/YYYY')}</span>
              </DatePickerButtonDivFieldSpanDate>
            </DatePickerButtonDivFieldSpan>
          </DatePickerButtonDiv>
        </DatePickerButton>


        <DatePickerButton onClick={this.changeCalendarView}>
          <DatePickerButtonDiv color="red">
            <DatePickerButtonDivIconSpan>
              <FontAwesomeIcon icon={faCalendarAlt}/>
            </DatePickerButtonDivIconSpan>
            <DatePickerButtonDivFieldSpan>
              <DatePickerButtonDivFieldSpanCheckIn>
                  Check Out
              </DatePickerButtonDivFieldSpanCheckIn>
              <DatePickerButtonDivFieldSpanDate>
                <span>{moment().add(1, 'day').format('ddd')}, {moment().add(1, 'day').format('MM/DD/YYYY')}</span>
              </DatePickerButtonDivFieldSpanDate>
            </DatePickerButtonDivFieldSpan>
          </DatePickerButtonDiv>
        </DatePickerButton>
      </div>
    );
  }

  renderCalendarPortal () {
    return ReactDOM.createPortal(
      <Calendar getUpdatedData={this.getUpdatedData} calculateAvrgRate={this.calculateAvrgRate}/>
      , document.getElementById('calendar'));
  }

  renderCalendar () {
    if (!this.state.calendarView) {
      return this.renderCalendarBasics();
    }
    if (this.state.calendarView) {
      return (
        <div>
          {this.renderCalendarBasics()}
          {this.renderCalendarPortal()}
        </div>
      );
    }
  }

  changeGuestsView () {
    this.setState({
      guestsView: !this.state.guestsView
    });
  }

  renderGuestsBasics () {
    return (
      <GuestsButton onClick={this.changeGuestsView}>
        <GuestsButtonDiv>
          <GuestsButtonIconSpan></GuestsButtonIconSpan>

          <GuestsButtonPickerSpan>

            <GuestsButtonPickerSpanGuestsSpan>Guests
            </GuestsButtonPickerSpanGuestsSpan>

            <GuestsButtonPickerSpanGuestsConfigSpan>
              <span>
                <GuestsButtonPickerSpanGuestsConfigInnerSpan> 1 room,</GuestsButtonPickerSpanGuestsConfigInnerSpan>

                <GuestsButtonPickerSpanGuestsConfigInnerSpan> 2 adults,</GuestsButtonPickerSpanGuestsConfigInnerSpan>

                <GuestsButtonPickerSpanGuestsConfigInnerSpan> 1 child</GuestsButtonPickerSpanGuestsConfigInnerSpan>
              </span>
            </GuestsButtonPickerSpanGuestsConfigSpan>

          </GuestsButtonPickerSpan>

        </GuestsButtonDiv>
      </GuestsButton>
    );
  }

  renderGuests () {
    if (!this.state.guestsView) {
      return this.renderGuestsBasics();
    }
    if (this.state.guestsView) {
      return (
        <div>
          {this.renderGuestsBasics()}
          {this.renderGuestsPortal()}
        </div>

      );
    }
  }

  renderGuestsPortal () {
    return ReactDOM.createPortal(
      <Guests getUpdatedData={this.getUpdatedData} changeGuestsView={this.changeGuestsView}/>,
      document.getElementById('guests')
    );
  }

  render () {

    return (
      <MainWrapper>
        <AppWrapper>

          <HeaderWrapper>
            <HeaderTextBlock>
              <HeaderIconSpan>

              </HeaderIconSpan>
              <HeaderTextSpan>
                6 people are viewing this hotel
              </HeaderTextSpan>
            </HeaderTextBlock>
          </HeaderWrapper>


          <CalendarGuestsWrapper>

            <DatePickerWrapper>
              {this.renderCalendar()}
            </DatePickerWrapper>

            <GuestsWrapper>
              {this.renderGuests()}
            </GuestsWrapper>

          </CalendarGuestsWrapper>


          <DealsWrapper>
            <BestDeals currentHotel={this.state.currentHotel}/>
            <AllDeals currentHotel={this.state.currentHotel}/>
          </DealsWrapper>

        </AppWrapper>

      </MainWrapper>
    );
  }
}

export default App;