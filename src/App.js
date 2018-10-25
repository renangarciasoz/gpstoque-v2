import React, { Component } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { themeDefault } from './themes/default';
import axios from 'axios';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './store/actions/auth';
import jwtDecode from 'jwt-decode';

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
    min-width: 300px;
    width: calc(100% - 80px);
    background: white;
    max-width: 80vw;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    position: relative;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0;

    content {
      width: 90%;
      border-radius: 0px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      padding: 40px 10px;
    }
  }
`

const Copyright = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 10px;
    color: white;
    text-align: center;
    user-select: none;
    
    a {
        text-decoration: none;
        color: white;
    }
`

const AppWrapper = styled.div`${styles}`


if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    
    axios.get(`https://gpstoque-api.herokuapp.com/user/${jwtDecode(localStorage.jwtToken)._id}`)
        .then(res => {
            store.dispatch(setCurrentUser(res.data));
        })
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={themeDefault}>
                    <AppWrapper>
                        <content>
                            <Routes />
                        </content>
                        <Copyright>Todos os direitos reservados a Grupo GPS SA. 2018 <br />Desenvolvido por <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/renan-g-2a251ba0/">Renan Garcia.</a></Copyright>
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
