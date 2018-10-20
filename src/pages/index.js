import React, { Component } from 'react';
import styled from 'styled-components';
import history from '../routes/history';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

const HomeComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const FirstText = styled.span`
    font-size: 32px;
`

const SecondText = styled.span`
    font-size: 22px;
`

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
`

const Exit = styled.a`
    font-size: 18px;
    position: absolute;
    top: 10px;
    right: 13px;
    cursor: pointer;
    

    &:hover {
        opacity: 0.8;
    }
`

const Button = styled.button`
    padding: 10px 30px;
    border: none;
    background: #293a5b;
    border-radius: 3px;
    margin-left: 20px;
    margin-bottom: 20px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    box-shadow: rgba(22, 23, 26, 0.5) 0px 8px 16px;
    transition: all 0.2s ease-in 0s;

    &:disabled, [disabled] {
        user-select: none;
        cursor: not-allowed;
        background: white;
        border: 1px solid #ccc;
        color: #ccc;
        box-shadow: none;
    }

    &:hover, [hover] {
        box-shadow: none;
    }
`

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "Renan",
            isAdmin: false
        }
    }

    logout(e) {
        e.preventDefault()
        this.props.logout()
    }

    goTo(route) {
        history.push(route)
    }

    render() {
        const { auth } = this.props.state;

        return (
            <HomeComponent>
                <FirstText>Olá {auth.user.name && auth.user.name.split(" ")[0]}, tudo bem?</FirstText>
                <SecondText>o que deseja fazer?</SecondText>
                <ActionsWrapper>
                    <Button onClick={() => this.goTo('/requests')} disabled>ir para solicitações</Button>
                    <Button onClick={() => this.goTo('/devolutions')} disabled>ir para devoluções</Button>
                    <Button onClick={() => this.goTo('/uniforms')}>ir para uniformes</Button>
                    <Button onClick={() => this.goTo('/dashboard')} disabled>ver o dashboard</Button>
                    {this.state.isAdmin ?
                        <Button onClick={() => this.goTo('/users')}>Adicionar funcionários</Button>
                    : null}
                </ActionsWrapper>
                <Exit onClick={this.logout.bind(this)}>sair</Exit>
            </HomeComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

export default connect(mapStateToProps, { logout })(Home);
