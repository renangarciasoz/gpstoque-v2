import React, { Component } from 'react';
import styled from 'styled-components';
import history from '../../routes/history';
import { connect } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';


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
    width: 100%;
    max-width: 670px;

    div {
        width: 100%;
    }

    span {
        margin-top: 30px;
    }

    h6 {
        margin: 0;
    }
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

const mounths = {
    "01": 0,
    "02": 1,
    "03": 2,
    "04": 3,
    "05": 4,
    "06": 5,
    "07": 6,
    "08": 7,
    "09": 8,
    "10": 9,
    "11": 10,
    "12": 11,
}

class Dashboards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uniformsAmount: 0,
            devolutionsAmount: 0,
            requestAmount: 0,
            
            uniforms: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Uniformes cadastrados',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [15, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },

            requests: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Requisições atendidas',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },

            devolutions: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Devoluções realizadas',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        }
    }

    componentDidMount(){
        if(this.props.state.uniforms.length === 0 && this.props.state.devolutions.length === 0 && this.props.state.requests.length === 0){
            history.push('/')
        }

        let uniformsAmount = 0;
        let requestsAmount = 0;
        let devolutionsAmount = 0;

        // Uniforms
        let newStateUniforms = this.state.uniforms
        let newDataSetUniforms = newStateUniforms.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]

        this.props.state.uniforms.map((uniform) => {
            if(!uniform.active){
                return false
            }

            newDataSetUniforms[mounths[uniform.createdAt.split("-")[1]]] ++;

            return uniformsAmount = uniformsAmount + uniform.amount
        })

        this.setState({uniforms: newStateUniforms, uniformsAmount: uniformsAmount})



        // Requests
        let newStateRequests = this.state.requests
        let newDataSetRequests = newStateRequests.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]

        this.props.state.requests.map((request) => {
            if(!request.active){
                return false
            }

            newDataSetRequests[mounths[request.createdAt.split("-")[1]]] ++;
            
            return requestsAmount ++;
        })

        this.setState({requests: newStateRequests, requestsAmount: requestsAmount})



        // Devolutions
        let newStateDevolutions = this.state.devolutions
        let newDataSetDevolutions = newStateDevolutions.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]

        this.props.state.devolutions.map((devolution) => {
            if(!devolution.active){
                return false
            }

            newDataSetDevolutions[mounths[devolution.createdAt.split("-")[1]]] ++;

            return devolutionsAmount ++;
        })

        this.setState({devolutions: newStateDevolutions, devolutionsAmount: devolutionsAmount})
    }

    goTo(route) {
        history.push(route);
    }

    render() {
        return (
            <DashboardComponent>
                <FirstText>Você está na seção de dashboard.</FirstText>
                <SecondText>aproveite as métricas :)</SecondText>
                <ActionsWrapper>
                    <SecondText>Atualmente você tem {this.state.uniformsAmount} uniformes ao total.</SecondText>
                    {this.state.uniformsAmount > 0 ? 
                        <div>
                            <Bar data={this.state.uniforms} />
                        </div>    
                    : <h6>Movimente para mostrar as métricas.</h6>}
                    
                    <SecondText>Atualmente você tem {this.state.requestsAmount} solicitações atendidas.</SecondText>
                    {this.state.devolutionsAmount > 0 ? 
                        <div>
                            <Line data={this.state.requests} />
                        </div>    
                    : <h6>Movimente para mostrar as métricas.</h6>}
                    
                    <SecondText>Atualmente você tem {this.state.devolutionsAmount} devoluções realizadas.</SecondText>
                    {this.state.devolutionsAmount > 0 ? 
                        <div>
                            <Line data={this.state.devolutions} />
                        </div>    
                    : <h6>Movimente para mostrar as métricas.</h6>}
                </ActionsWrapper>
                <Back onClick={() => this.goTo('/')}>voltar</Back>
            </DashboardComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(Dashboards);
