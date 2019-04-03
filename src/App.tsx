import React, { Component } from 'react';

import AppRouter from './components/shared/routers/AppRouter';
import Header from './views/Header';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <div>
        <Header height={"100"} />
        <AppRouter />
      </div>
    );
  }
}

export default App;
