import React, { Component } from 'react';

const API_URL = 'https://opentdb.com/api.php?amount=10';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null
    };
  }

  componentDidMount() {
    this.requestData();
  }

  async requestData() {
    this.setState({ loading: true });

    let firstQuizData;
    try {
      const response = await window.fetch(API_URL);
      const data = await response.json();
      firstQuizData = data.results[0];
    } catch (error) {
      firstQuizData = null;
    }

    this.setState({
      data: firstQuizData,
      loading: false
    });
  }

  render() {
    return (
      <div>
        { this.renderData() }
        { this.renderRequestButton() }
      </div>
    );
  }

  renderData() {
    if (this.state.loading) {
      return <p>データ取得中...</p>;
    }
    if (!this.state.loading && !this.state.data) {
      return <p>データなし</p>;
    }

    return <p>{ JSON.stringify( this.state.data ) }</p>;
  }

  renderRequestButton() {
    if (this.state.loading) {
      return <button disabled>データ取得中...</button>;
    }

    return <button onClick={ () => { this.requestData() } }>データを取得する</button>;
  }
}

export default App;
