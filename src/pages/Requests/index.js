import React, { Component } from 'react';
import styled from 'styled-components';
import history from '../../routes/history';

const RequestComponent = styled.div`
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

const Back = styled.a`
    font-size: 18px;
    position: absolute;
    top: 10px;
    left: 13px;
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
        cursor: none;
        background: white;
        border: 1px solid #ccc;
        color: #ccc;
    }

    &:hover, [hover] {
        box-shadow: none;
    }
`

class Requests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "Renan Santana Garcia",
            isAdmin: false,
        }
    }

    goTo(route) {
        history.push(route);
    }

    render() {
        return (
            <RequestComponent>
                <FirstText>Você está em solicitações.</FirstText>
                <SecondText>e agora deseja fazer o quê?</SecondText>
                <ActionsWrapper>
                    <Button>Fazer uma solicitação</Button>
                    <Button>Ver todas as solicitações</Button>
                </ActionsWrapper>
                <Back onClick={() => this.goTo('/')}>Voltar</Back>
            </RequestComponent>
        );
  }
}

export default Requests;
