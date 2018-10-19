import React, { Component } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { themeDefault } from './themes/default';

import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';


const styles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;

  content {
    width: calc(100% - 80px);
    background: white;
    max-width: 500px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0;

    content {
      width: 90%;
      border-radius: 0px;
      padding: 40px 0;
    }
  }
`

const AppWrapper = styled.div`${styles}`

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={themeDefault}>
                    <AppWrapper>
                        <content>
                            <Routes />
                        </content>
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
