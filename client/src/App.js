import React from 'react';
import './App.css';
import Main from './components/Main';

import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Main></Main>
      </div>
    );
  }
}

export default App;