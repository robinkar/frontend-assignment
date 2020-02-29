import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import InputContainer from './components/InputContainer';
import InfoContainer from './components/InfoContainer';
import DataContainer from './components/DataContainer';

//The main Component for the App
export class App extends Component<{}, {
  nConversations: number, 
  nUserMessages: number, 
  nVisitorMessages: number, 
  conversationData: Array<Object>, 
  startDate?: string, 
  endDate?: string, 
  accessToken?: string, 
  error: boolean,
  ascending: boolean,
  sort: string}> {
 
  constructor(props: {}) {
    super(props);

    //Get the startDate, endDate and accessToken from the localStorage if possible
    const startDate = localStorage.getItem('startDate');
    const endDate = localStorage.getItem('endDate');
    const accessToken = localStorage.getItem('accessToken');
    this.state = {
      nConversations: -1,
      nUserMessages: -1,
      nVisitorMessages: -1,
      conversationData: [],
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      accessToken: accessToken || undefined,
      error: false,
      ascending: false,
      sort: 'date'
    }
    
  }

  //Sorts the array arr of objects based on the property
  sortBy = (arr: Array<any>, property: string, ascending: boolean) => {
    let d = ascending ? 1 : -1;

    let _sort = (a: any, b: any): number => {
      return a[property] < b[property] ? d : -d;
    }

    return arr.sort(_sort);
  }

  //Change the data to be sorted based on property(e.g. date or conversation_count)
  changeSort = (property: string, ascending: boolean) => {
    const data: Array<any> = this.state.conversationData;
    const sortedData = this.sortBy(data, property, ascending);
    this.setState({
      conversationData: sortedData,
      ascending: ascending,
      sort: property
    });
  }

  //User submits the dates and access token, fetch the data from the API
  onSubmit = (startDate: string, endDate: string, accessToken: string) => {
    //Quick check to make sure none of the fields are completely empty
    if (startDate.length === 0 || endDate.length === 0 || accessToken.length === 0)
      return;

    //Save the parameters in the local storage
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    localStorage.setItem('accessToken', accessToken);
    
    fetch(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${startDate}&end_date=${endDate}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': `Token ${accessToken}`
        })
      })
      .then(res => {
        //If response was not 200 OK don't try to parse the JSON
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()}
        )
      .then((json) => {
        //Sort the daily conversation data based on the currently chosen sort
        const conversationData = this.sortBy(json['by_date'], this.state.sort, this.state.ascending);
        //Save the fetched data to the state, with error flag false
        this.setState({
          nConversations: json['total_conversation_count'],
          nUserMessages: json['total_user_message_count'],
          nVisitorMessages: json['total_visitor_message_count'],
          conversationData: conversationData,
          error: false
        });
      },
      //Error during fetching the data(e.g. unauthorized, timeout)
      (error) => {
        this.setState({
          error: true
        })
        console.log("Error retrieving data from the API");
      });
  }

  render () {
    const { nConversations, nUserMessages, nVisitorMessages } = this.state;

    //Only show the information containers if the fetch was successful, otherwise show an error message
    let content;
    if (this.state.error) {
      content = <div className='errorMessage'>Something went wrong retrieving the data</div>
    } else {
      content = (
        //InfoContainer containing the 3 large boxes with information and DataContainer containing the DataTable with Pagination
        <React.Fragment>
          <InfoContainer nConversations={nConversations} nUserMessages={nUserMessages} nVisitorMessages={nVisitorMessages}/>
          <DataContainer data={this.state.conversationData} changeSort={this.changeSort} ascending={this.state.ascending} sort={this.state.sort}/>
        </React.Fragment>
      )
    }
    
    return (
      <div className="App">
        <Header />
        <InputContainer onSubmit={this.onSubmit} startDate={this.state.startDate} endDate={this.state.endDate} accessToken={this.state.accessToken}/>
        {content}
      </div>
    );
  }
}

export default App;
