import React, { Component } from 'react';
import api from '../../services/api';
import { Form, Input, Scope } from "@rocketseat/unform";

import './styles.css';

export default class Main extends Component{

    state = {
        products: [],
        totalPages: 1,
        page: 1
    }    

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {        
        const { page } = await this.state;
        const response = await api.get('/products?page='+page);        

        this.setState({products: response.data.docs});
        this.setState({totalPages: response.data.pages})
    }

    paginateNext = async () =>{
        const { page, totalPages } = await this.state;
        
        if(page < totalPages){
            await this.setState({page: page+1});
            await this.loadProducts();
        }
    }

    paginatePrev = async () =>{
        const { page, totalPages } = await this.state;
        
        if(page > 1){
            await this.setState({page: page-1});
            await this.loadProducts();
        }
    }

    handleSubmit = async (data) => {
        const response = await api.post('/products', data);
        const { products } = await this.state;

        await this.setState({products: products.concat([response.data])});
    }

    render(){
        const { products } = this.state;
        return (
            <div>
                <div className="product-list">
                    {products.map(product =>(
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                            <div>
                                <iframe src={product.url} frameborder="0" allowfullscreen></iframe>
                            </div>
                            <a href={product.url} target="_blank">Acessar</a>
                        </article>
                    ))}                    
                </div>
                <div className="product-paginate">
                    <button onClick={this.paginatePrev} type="button">Página anterior</button>
                    <button onClick={this.paginateNext} type="button">Próxima página</button>
                </div>                
                <div id="productForm" className="product-form">
                    <h2>Adicionar item ao catálogo</h2>
                    <Form onSubmit={this.handleSubmit} initialData={this.initialData}>
                        <label>Título</label>
                        <Input name="title" />

                        <label>Descrição</label>
                        <Input name="description" />

                        <label>URL</label>
                        <Input name="url" />

                        <button type="submit">Adicionar</button>
                    </Form>
                </div>
            </div>
        )
    }
}