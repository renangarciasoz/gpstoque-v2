import React, { Component } from 'react';
import styled from 'styled-components';
import history from '../../routes/history';

const DashboardComponent = styled.div`
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

class Dashboards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "Renan Santana Garcia",
            isAdmin: false
        }
    }

    goTo(route) {
        history.push(route);
    }

    render() {
        return (
            <DashboardComponent>
                <FirstText>Você está em dashboard.</FirstText>
                <SecondText>aproveite as métricas :)</SecondText>
                <ActionsWrapper>
                    <FirstText>Colocar gráficos aqui</FirstText>
                </ActionsWrapper>
                <Back onClick={() => this.goTo('/')}>Voltar</Back>
            </DashboardComponent>
        );
  }
}

export default Dashboards;
