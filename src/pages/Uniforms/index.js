import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import history from '../../routes/history';
import { connect } from 'react-redux';
import { updateUniforms } from '../../store/actions/uniforms';
import axios from 'axios';
import loading from '../../assets/loading.gif';

const UniformComponent = styled.div`
    width: 100%;
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
`

const InsertWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    form {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        padding: 30px 10px;

        input {
            padding: 10px;
            font-size: 16px;
            font-family: 'Montserrat', sans-serif;
            width: 100%;
            margin-right: 10px;
            border: none;
            border-bottom: 1px solid #ccc;
            outline: none;

            &:focus {
                border-bottom: 1px solid #293a5b;
            }
        }
    }
`

const ItemSearch = styled.div`
    width: 250px;
    border: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    transition: all 0.2s ease-in 0s;
    margin-bottom: 20px;

    &:hover {
        border: 1px solid #293a5b;

        img {
            border-bottom: 1px solid #293a5b;
        }
    }

    img {
        transition: all 0.2s ease-in 0s;
        width: 100%;
        border-bottom: 1px solid #ccc;
    }

    span {
        margin-top: 10px;
    }
`

const Field = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    label {
        align-self: flex-start;
        margin-right: 10px;
    }

    input {
        padding: 5px;
        font-size: 16px;
        border: 1px solid #ccc;
        font-family: 'Montserrat', sans-serif;

        &:focus {
            border: 1px solid #293a5b;
        }

        @media screen and (max-width: 800px) {
            width: 100%;
        }
    }
    
    textarea {
        min-width: 209px;
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

const ButtonsFormWrapper = styled.div`
    display: flex;
    flex-direction: row;

    button {
        margin-left: 10px;
        margin: 20px 5px;
    }
`

class Uniforms extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Propriedades default
            uniforms: this.props.uniforms,
            isLoading: false,

            //Abas
            create: false,
            edit: false,
            insert: false,
            list: false,

            //Editar
            productToUpdate: null,
            preEditProductName: null,
            preEditDescription: null,
            preEditQuantity: null,
            preEditProductImage: null,
            productToUpdateID: null,

            //Inserir quantidade
            updateQuantity: false,
            productToInsert: null,
            preInsertQuantity: null,
        }
    }

    // Ativar aba de lista quando iniciar o componente
    componentDidMount() {
        this.showList();
    }

    // Buscar todos os produtos no WS
    getItems() {
        return axios.get(`https://gpstoque-api.herokuapp.com/uniform`)
            .then(res => {
                this.props.updateUniforms(res.data)
            })
    }

    // Desativar um produto
    deleteProduct = (productID, index) => {
        if(!window.confirm("Tem certeza que deseja deletar o unifome?")){
            return false
        }

        const newProducts = [...this.props.uniforms]
        newProducts.splice(index, 1)
        this.props.updateUniforms(newProducts)

        let updatedProduct = {
            active: false
        }

        axios({
            method: 'put',
            url: 'https://gpstoque-api.herokuapp.com/uniform/' + productID,
            data: updatedProduct
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

    // Mostrar aba de inserir
    showInsert(){
        this.props.updateUniforms([])

        this.setState({
            updateQuantity: false,
            create: false,
            edit: false,
            insert: true,
            list: false,
        })
    }

    // Mostrar aba de criar
    showCreate(){
        this.showList()

        this.setState({
            create: true,
            edit: false,
            insert: false,
            list: false,
        })
    }

    // Mostrar aba de listagem
    showList(){
        this.setState({
            create: false,
            edit: false,
            insert: false,
            list: true,
        })

        this.getItems()
    }

    // Rota por history
    goTo(route) {
        history.push(route);
    }

    // Atualizar informações do produto
    updateProduct = () => {
        let updatedProduct = {
            name: this.state.preEditProductName,
            amount: this.state.preEditQuantity,
            description: this.state.preEditDescription,
            imgUrl: this.state.preEditProductImage
        }

        this.setState({isLoading: true});

        axios({
            method: 'put',
            url: 'https://gpstoque-api.herokuapp.com/uniform/' + this.state.productToUpdateID,
            data: updatedProduct
        }).then(() => {
            axios({
                method: 'get',
                url: 'https://gpstoque-api.herokuapp.com/uniform/'
            }).then((response) => {
                let newProductsArr = response.data
                this.props.updateUniforms(newProductsArr)
                this.setState({ edit: false, isLoading: false})
            })
        })
    }

    // Criar um novo produto
    createProduct = (name, quantity, description, image) => {
        if(name === "" || quantity === "" || description === ""){
            return !window.confirm("Corrija os campos em branco")
        }
        
        let updatedProduct = {
            name: name,
            amount: parseInt(quantity),
            description: description,
            imgUrl: image,
            active: true,
            code: this.state.uniforms.length + 1
        }

        this.setState({isLoading: true});

        axios({
            method: 'post',
            url: 'https://gpstoque-api.herokuapp.com/uniform/',
            data: updatedProduct
        }).then(() => {
            axios({
                method: 'get',
                url: 'https://gpstoque-api.herokuapp.com/uniform/'
            }).then((response) => {
                let newProductsArr = response.data
                this.setState({isLoading: false});
                this.props.updateUniforms(newProductsArr)
                this.showList()
            })
        })
    }

    // Buscar produto
    filterItem = (productID) => {
        this.setState({isLoading: true});

        axios({
            method: 'get',
            url: 'https://gpstoque-api.herokuapp.com/uniform'
        })
            .then((response) => {
                let productsArr = response.data.filter((product) => product.code === parseInt(productID))
                this.props.updateUniforms(productsArr)
                this.setState({isLoading: false});
            })
    }

    // Inserir uma quantidade maior
    insertQuantity = (quantity) => {
        if(parseInt(quantity) <= this.state.preInsertQuantity){
            return !window.confirm("Digite uma quantidade maior do que está.")
        }
        
        let insertQuantity = {
            amount: parseInt(quantity) || this.state.preInsertQuantity
        }
        
        this.setState({isLoading: true});

        axios({
            method: 'put',
            url: 'https://gpstoque-api.herokuapp.com/uniform/' + this.state.productToInsertID,
            data: insertQuantity
        }).then(() => {
            axios({
                method: 'get',
                url: 'https://gpstoque-api.herokuapp.com/uniform/'
            }).then((response) => {
                let newProductsArr = response.data
                this.props.updateUniforms(newProductsArr)
                this.setState({ updateQuantity: false, isLoading: true })
                this.showList()
            })
        })
    }

    render() {
        const sortKeys = (a, b) => { return a.code - b.code }

        const products = this.props.uniforms.sort(sortKeys).map((product, index) => {
            if(!product.active) {
                return false
            }
            
            return <tr key={product._id}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.amount}</td>
                <td>
                    <Button form="true" onClick={() => {
                    this.setState({ 
                        edit: true, 
                        productToUpdateID: product._id,
                        productToUpdate: product.code,
                        preEditProductImage: product.imgUrl,
                        preEditProductName: product.name,
                        preEditDescription: product.description,
                        preEditQuantity: product.amount,
                    })}} key={product.id}>Editar</Button>
                </td>
                <td>
                    <Button delete="true" form="true" onClick={() => {
                    this.deleteProduct(product._id, index)
                }}>Deletar</Button>
                </td>
            </tr>
        })

        const image = React.createRef();
        const name = React.createRef();
        const quantity = React.createRef();
        const description = React.createRef();
        const search = React.createRef();
        const quantityInsert = React.createRef();

        return (
            <UniformComponent>
                <FirstText>Você está na seção de uniformes.</FirstText>
                <ActionsWrapper>
                    <Button onClick={() => this.showInsert()} active={this.state.insert}>Inserir uniformes</Button>
                    <Button onClick={() => this.showCreate()} active={this.state.create}>Criar um novo uniforme</Button>
                    <Button onClick={() => this.showList()} active={this.state.list}>Ver todos os uniformes</Button>
                </ActionsWrapper>
                <Back onClick={() => this.goTo('/')}>voltar</Back>
                
                {this.state.create ? 
                    <ComponentWrapper>
                        <EditForm>
                            <SecondText>Digite todas as informações, ok?</SecondText>
                            <Field>
                                <label>Código</label>
                                <input type="number" value={this.props.uniforms.length + 1} disabled></input>
                            </Field>
                            <Field>
                                <label>Imagem URL (250x160)</label>
                                <input type="text" ref={image}></input>
                            </Field>
                            <Field>
                                <label>Nome</label>
                                <input type="text" ref={name}></input>
                            </Field>
                            <Field>
                                <label>Quantidade</label>
                                <input type="number" ref={quantity}></input>
                            </Field>
                            <Field>
                                <label>Descrição</label>
                                <textarea type="text" ref={description}></textarea>
                            </Field>

                            <ButtonsFormWrapper>
                                <Button delete="true" form="true" onClick={() => this.showList()}>Cancelar</Button>
                                <Button form="true" onClick={() => this.createProduct(name.current.value, quantity.current.value, description.current.value, image.current.value)}>Salvar</Button>
                            </ButtonsFormWrapper>

                            {this.state.isLoading? 
                                <img alt="Loading" src={loading} width="30" height="30"/>
                            : null}
                        </EditForm>
                    </ComponentWrapper>
                : null}

                {this.state.insert ? 
                    <ComponentWrapper>
                        {!this.state.updateQuantity ? 
                            <InsertWrapper>
                                <SecondText>Digite o código do uniforme que deseja aumentar a quantidade.</SecondText>
                                <form>
                                    <label>Código:</label>
                                    <input placeholder="123" type="number" ref={search}></input>
                                    <Button form="true" onClick={() => this.filterItem(search.current.value)}>Pesquisar</Button>
                                </form>

                                {this.state.isLoading ? 
                                    <img alt="Loading" src={loading} width="30" height="30"></img>
                                : null}

                                {this.props.uniforms.sort(sortKeys).map((product, index) => {
                                    if(!product.active) {
                                        return false
                                    }

                                    return (
                                        <ItemSearch key={index} onClick={() => {
                                            this.setState({ 
                                                updateQuantity: true,
                                                productToInsertID: product._id,
                                                productToInsert: product.code,
                                                preInsertQuantity: product.amount
                                            })}}>
                                            <img alt="Imagem do produto" src={product.imgUrl || "https://png.pngtree.com/element_origin_min_pic/16/12/13/8fc101b24a5e042e1af89c410f909ab6.jpg"} height="160"></img>
                                            <span>{product.name}</span>
                                            <span>{product.amount}</span>
                                        </ItemSearch>
                                    )
                                })}
                            </InsertWrapper>
                        : null}

                        {this.state.updateQuantity ? 
                            <EditForm>
                                <SecondText>Atualizar a quantidade do produto "{this.state.productToInsert}".</SecondText>
                                <Field>
                                    <label>Quantidade</label>
                                    <input type="number" placeholder={this.state.preInsertQuantity} ref={quantityInsert}></input>
                                </Field>
                                <ButtonsFormWrapper>
                                    <Button delete="true" form="true" onClick={() => this.setState({ updateQuantity: false })}>Cancelar</Button>
                                    <Button form="true" onClick={() => this.insertQuantity(quantityInsert.current.value)}>Salvar</Button>
                                </ButtonsFormWrapper>

                                {this.state.isLoading ? 
                                    <img alt="Loading" src={loading} width="30" height="30"></img>
                                : null}
                            </EditForm>
                        : null}   
                    </ComponentWrapper>
                : null}

                {this.state.list ? 
                    <ComponentWrapper>
                        {!this.state.edit ? 
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Quantidade</th>
                                        <th>Editar</th>
                                        <th>Deletar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products}
                                </tbody>
                            </Table>
                        : null}

                        {this.state.edit ? 
                            <EditForm>
                                <SecondText>O código deste produto é "{this.state.productToUpdate}".</SecondText>
                                <Field>
                                    <label>Imagem URL (250x160)</label>
                                    <input type="text" value={this.state.preEditProductImage} onChange={(e) => {this.setState({preEditProductImage: e.target.value})}}></input>
                                </Field>
                                <Field>
                                    <label>Nome</label>
                                    <input type="text" value={this.state.preEditProductName} onChange={(e) => {this.setState({preEditProductName: e.target.value})}}></input>
                                </Field>

                                <Field>
                                    <label>Quantidade</label>
                                    <input type="number" value={this.state.preEditQuantity} onChange={(e) => {this.setState({preEditQuantity: e.target.value})}}></input>
                                </Field>

                                <Field>
                                    <label>Descrição</label>
                                    <textarea type="text" value={this.state.preEditDescription} onChange={(e) => {this.setState({preEditDescription: e.target.value})}}></textarea>
                                </Field>

                                <ButtonsFormWrapper>
                                    <Button delete="true" form="true" onClick={() => this.setState({ edit: false })}>Cancelar</Button>
                                    <Button form="true" onClick={() => this.updateProduct()}>Salvar</Button>
                                </ButtonsFormWrapper>

                                {this.state.isLoading ? 
                                    <img alt="Loading" src={loading} width="30" height="30"></img>
                                : null}
                            </EditForm>
                        : null}
                    </ComponentWrapper>
                : null}
            </UniformComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        uniforms: state.uniforms
    }
}

export default connect(mapStateToProps, { updateUniforms })(Uniforms);
