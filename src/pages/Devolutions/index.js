import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import history from '../../routes/history';
import { connect } from 'react-redux';
import { updateDevolutions } from '../../store/actions/devolutions';
import { updateUniforms } from '../../store/actions/uniforms';
import axios from 'axios';

const DevolutionComponent = styled.div`
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

    ${props => props.active && css`
        box-shadow: none;
    `}

    ${props => props.form && css`
        margin: 0;
        font-size: 12px;
        box-shadow: none;
    `}

    ${props => props.delete && css`
        background: red;
        opacity: 0.8;
    `}

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

const ComponentWrapper = styled.div`
    margin-top: 50px;
    display: flex;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    max-width: 100%;
    overflow-x: scroll;
    flex-direction: column;
    align-items: flex-start;
`

const Table = styled.table`
    width: 100%;

    button {
        box-shadow: none;
    }

    th {
        background: white;
        position: sticky;
        top: 0;
        z-index: 10;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-sizing: content-box;
        padding: 10px 20px;
        max-width: 230px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        font-weight: 500;
    }

    td {
        padding: 10px 20px;
        max-width: 200px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        border-bottom: 1px solid #ccc;
    }

    @media screen and (max-width: 800px) {
        th {
            font-size: 16px;
            padding: 10px 5px;
        }

        td {
            padding: 5px 5px;
            font-size: 14px;
        }
    }
`

const EditForm = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    align-self: center;

    label {
        margin-right: 10px;
    }
    
    textarea {
        padding: 5px;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        border: 1px solid #ccc;

        &:focus {
            border: 1px solid #293a5b;
        }
        
        @media screen and (max-width: 800px) {
            width: 100%;
        }
    }
    
`

const ButtonsWrapper = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    button {
        margin-left: 10px;
        margin: 20px 5px;
    }
`

const FieldsetDiv = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 400px;

    input {
        padding: 5px;
        font-size: 16px;
        border: 1px solid #ccc;
        font-family: 'Montserrat', sans-serif;

        &:focus {
            border: 1px solid #293a5b;
        }

        @media screen and (max-width: 800px) {
            width: 90%;
        }
    }
`

const UniformWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;

    input {
        padding: 5px;
        font-size: 16px;
        border: 1px solid #ccc;
        font-family: 'Montserrat', sans-serif;

        &:focus {
            border: 1px solid #293a5b;
        }

        @media screen and (max-width: 800px) {
            width: 70%;
        }
    }

    div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: center;
        margin-top: 10px;

        span {
            padding: 5px 8px;
            background: #ccc;
            border-radius: 2px;
            margin-right: 5px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            user-select: none;
    
            button {
                padding: 0;
                margin-left: 5px;
                border: none;
                background: none;
                cursor: pointer;
                outline: none;
            }
        }
    }
`

const ButtonAdd = styled.button`
    height: 100%;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    margin-left: 4px;
    color: #293a5b;
    outline: none;

    &:focus, &:hover {
        color: #293a5b;
    }
`


class Devolutions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Propriedades default
            devolutions: this.props.devolutions,

            //Abas
            create: false,
            list: false,
            details: false,

            //create
            preCreateUniforms: [],

            //Detalhes
            productDetailsID: null,
            productDetailsCode: null,
            productDetailsCR: null,
            productDetailsUniforms: null,
            productDetailsDescription: null
        }
    }

    // Ativar aba de lista quando iniciar o componente
    componentDidMount() {
        this.showCreate();
    }

    // Buscar todos os produtos no WS
    getItems() {
        return axios.get(`https://gpstoque-api.herokuapp.com/devolution`)
            .then(res => {
                this.props.updateDevolutions(res.data)
            })
    }

    // Mostrar aba de listagem
    showList(){
        this.setState({
            create: false,
            list: true,
            details: false,
        })

        this.getItems()
    }

    // Mostrar aba de criar
    showCreate(){
        this.showList()

        this.setState({
            preCreateUniforms: [],
            create: true,
            list: false,
            details: false,
        })
    }

    // Mostrar aba de listagem
    showDetails(){
        this.setState({
            create: false,
            list: false,
            details: true,
        })
    }

    // Criar um novo produto
    createDevolution = (uniforms, description, cr) => {
        if(uniforms.length === 0 || description === ""){
            return !window.confirm("Corrija os campos em branco")
        }
        
        let devolution = {
            uniforms: uniforms,
            description: description,
            cr: cr,
            active: true,
            code: this.props.devolutions.length + 1
        }

        axios({
            method: 'post',
            url: 'https://gpstoque-api.herokuapp.com/devolution/',
            data: devolution
        }).then(() => {
            axios({
                method: 'get',
                url: 'https://gpstoque-api.herokuapp.com/devolution/'
            }).then((response) => {
                let newDevolutionsArr = response.data
                this.props.updateDevolutions(newDevolutionsArr)
                this.showList()
            })
        })
    }

    goTo(route) {
        history.push(route);
    }
    
    getDateFormat(value) {
        let date = new Date(value)
        return value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    // Buscar produto
    filterItem = (productID) => {
        return axios({
            method: 'get',
            url: 'https://gpstoque-api.herokuapp.com/uniform'
        })
            .then((response) => {
                return response.data.filter((product) => product.code === parseInt(productID))[0]
            })
    }

    addUniform(uniformCode){
        if (uniformCode === "" || !uniformCode) {
            return false
        }
        this.filterItem(parseInt(uniformCode))
        .then(
            (res) => {
                if(!res || !res.active) {
                    return window.alert("Não encontramos nenhum produto com esse código.")
                }

                const newProducts = [...this.state.preCreateUniforms]
                newProducts.push(res)
                this.setState({preCreateUniforms: newProducts})

                this.updateQuantity(res._id, res.amount - 1)
            }
        )
    }

    delUniform(uniform, index) {
        const newProducts = [...this.state.preCreateUniforms]
        newProducts.splice(index, 1)
        this.setState({preCreateUniforms: newProducts})

        this.updateQuantity(uniform._id, uniform.amount + 1)
    }

    // Inserir uma quantidade maior
    updateQuantity = (productID, quantity) => {
        
        let insertQuantity = {
            returned: parseInt(quantity)
        }

        axios({
            method: 'put',
            url: 'https://gpstoque-api.herokuapp.com/uniform/' + productID,
            data: insertQuantity
        }).then(() => {
            axios({
                method: 'get',
                url: 'https://gpstoque-api.herokuapp.com/uniform/'
            }).then((response) => {
                let newProductsArr = response.data
                this.props.updateUniforms(newProductsArr)
            })
        })
    }

    render() {
        const sortKeys = (a, b) => { return a.code - b.code }

        const products = this.props.devolutions.sort(sortKeys).map((product, index) => {
            if(!product.active) {
                return false
            }
            
            return <tr key={product._id}>
                <td>{product.code}</td>
                <td>{product.cr}</td>
                <td>{this.getDateFormat(product.createdAt)}</td>
                <td>{product.uniforms.length}</td>
                <td>
                    <Button form="true" onClick={() => {
                    this.setState({ 
                        details: true, 
                        productDetailsID: product._id,
                        productDetailsCode: product.code,
                        productDetailsCR: product.cr,
                        productDetailsUniforms: product.uniforms,
                        productDetailsDescription: product.description
                    })}} key={product.id}>Ver detalhes</Button>
                </td>
            </tr>
        })

        const uniformCode = React.createRef();
        const clientCode = React.createRef();
        const description = React.createRef();

        return (
            <DevolutionComponent>
                <FirstText>Você está em devoluções.</FirstText>
                <SecondText>e agora deseja fazer o quê?</SecondText>
                <ActionsWrapper>
                    <Button onClick={() => this.showCreate()} active={this.state.create}>Devolver uniformes</Button>
                    <Button onClick={() => this.showList()} active={this.state.list}>Ver histórico de devoluções</Button>
                </ActionsWrapper>
                <Back onClick={() => this.goTo('/')}>voltar</Back>

                {this.state.create ? 
                    <ComponentWrapper>
                        <EditForm>
                            <SecondText>Preencha todos os campos em branco e adicione todos os uniformes solicitados.</SecondText>
                            <FieldsetDiv>
                                <label>Código</label>
                                <input type="number" value={this.props.devolutions.length + 1} disabled></input>
                            </FieldsetDiv>
                            <FieldsetDiv>
                                <label>Código do cliente</label>
                                <input type="number" ref={clientCode}></input>
                            </FieldsetDiv>
                            <FieldsetDiv>
                                <label>Uniformes</label>
                                <UniformWrapper>
                                    <FieldsetDiv>
                                        <input placeholder="Código ex: 123" type="number" ref={uniformCode}></input>
                                        <ButtonAdd onClick={() => this.addUniform(uniformCode.current.value)}>+</ButtonAdd>
                                    </FieldsetDiv>
                                    <div>
                                        {this.state.preCreateUniforms.map((uniform, index) => {
                                            return (<span key={index}>{uniform.code}: {uniform.name} <button onClick={() => this.delUniform(uniform, index)}>x</button></span>)
                                        })}
                                    </div>
                                    {this.state.preCreateUniforms.length > 0 ?
                                        <label>Total: {this.state.preCreateUniforms.length} uniformes</label>
                                    : null}
                                </UniformWrapper>
                            </FieldsetDiv>
                            <FieldsetDiv>
                                <label>Descrição</label>
                                <textarea type="text" placeholder={this.state.preEditDescription} ref={description}></textarea>
                            </FieldsetDiv>

                            <ButtonsWrapper>
                                <Button delete="true" form="true" onClick={() => this.showList()}>Cancelar</Button>
                                <Button form="true" onClick={() => this.createRequest(this.state.preCreateUniforms, description.current.value, clientCode.current.value)}>Salvar</Button>
                            </ButtonsWrapper>
                        </EditForm>
                    </ComponentWrapper>
                : null}

                {this.state.list && products.length > 0? 
                    <ComponentWrapper>
                        {!this.state.details ? 
                            <Table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Código do cliente (CR)</th>
                                    <th>Realizada em</th>
                                    <th>Quantidade de uniformes</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products}
                            </tbody>
                        </Table>
                        : null }

                        {this.state.details ? 
                            <EditForm>
                                <SecondText>Você está vendo os detalhes da devolução com o código "{this.state.productDetailsCode}".</SecondText>
                                <FieldsetDiv>
                                    <label>Código</label>
                                    <input type="number" value={this.state.productDetailsCode} disabled></input>
                                </FieldsetDiv>
                                <FieldsetDiv>
                                    <label>Código do cliente</label>
                                    <input type="number" value={this.state.productDetailsCR}></input>
                                </FieldsetDiv>
                                <FieldsetDiv>
                                    <label>Uniformes</label>
                                    <UniformWrapper>
                                        <div>
                                            {this.state.productDetailsUniforms.map((uniform, index) => {
                                                return (<span key={index}>{uniform.code}: {uniform.name}</span>)
                                            })}
                                        </div>
                                        {this.state.productDetailsUniforms.length > 0 ?
                                            <label>Total: {this.state.productDetailsUniforms.length} uniformes</label>
                                        : null}
                                    </UniformWrapper>
                                </FieldsetDiv>
                                <FieldsetDiv>
                                    <label>Descrição</label>
                                    <textarea type="text" value={this.state.productDetailsDescription}></textarea>
                                </FieldsetDiv>

                                <ButtonsWrapper>
                                    <Button form="true" onClick={() => this.showList()}>Sair</Button>
                                </ButtonsWrapper>
                            </EditForm>
                        : 
                        null}
                    </ComponentWrapper>
                : null}

                {this.state.list && products.length <= 0 ?
                    <SecondText>Não possui nenhuma devolução</SecondText>   
                : null}
            </DevolutionComponent>
        );
  }
}

function mapStateToProps(state) {
    return {
        uniforms: state.uniforms,
        devolutions: state.devolutions
    }
}

export default connect(mapStateToProps, { updateDevolutions, updateUniforms })(Devolutions);

