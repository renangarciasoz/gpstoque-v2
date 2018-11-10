import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import history from '../../routes/history';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';
import logo from '../../assets/brand-gps-color.png';
import loading from '../../assets/loading.gif';

const LoginComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    user-select: none;

    form {
        margin-top: 40px;
        width: 100%;
        margin-bottom: 20px;

        div {
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            label {

            }

            input {
                outline: none;
                padding: 10px;
                width: calc(100% - 20px);
                border: none;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
                font-family: 'Montserrat', sans-serif;

                &:focus {
                    border-bottom: 1px solid #293a5b;
                }
            }
        }   
    }
`

const Button = styled.button`
    padding: 10px 30px;
    border: none;
    background: #293a5b;
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    box-shadow: none;
    transition: all 0.2s ease-in 0s;

    ${props => props.active && css`
        box-shadow: none;
    `}

    ${props => props.form && css`
        margin: 0;
    `}

    ${props => props.delete && css`
        background: red;
        opacity: 0.8;
    `}

    &:disabled, [disabled] {
        user-select: none;
        cursor: wait;
        background: white;
        border: 1px solid #ccc;
        box-shadow: none;
        color: #ccc;
    }

    &:hover, [hover] {
        box-shadow: none;
    }

    &:focus {
        box-shadow: rgba(22, 23, 26, 0.5) 0px 8px 16px;
    }
`

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            identifier: '',
            password: '',
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeIdentifier = this.onChangeIdentifier.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    componentDidMount() {
        this.props.auth.isAuthenticated ? history.push('/') :  history.push('/login')
    }

    validateInput(data) {
        this.setState({isLoading: "dsadsadsaassd"})
        let errors = {};

        return {
            errors,
            isValid: true
        };
    }

    isValid() {
        const { errors, isValid } = this.validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                (res) => history.push('/'),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            );
        }
    }

    onChangeIdentifier(e) {
        this.setState({ identifier: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const { isLoading } = this.state;

        return (
            <LoginComponent>
                <img alt="Logo da empresa" src={logo} height="55" width="181"></img>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Usuário ou e-mail corporativo</label>
                        <input onChange={this.onChangeIdentifier} value={this.state.identifier} placeholder="example@gpssa.com" autoFocus></input>
                    </div>
                    <div>
                        <label>Senha</label>
                        <input onChange={this.onChangePassword} value={this.state.password} type="password" placeholder="1234@@gps"></input>
                    </div>
                    <Button onClick={this.onSubmit} disabled={isLoading} form="true">Entrar</Button>
                </form>

                {this.state.isLoading? 
                    <img alt="Loading" src={loading} width="30" height="30"/>
                : null}
                
            </LoginComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {login})(Login);
