import React, { Component } from 'react';
import api from '../../services/api';
import { Form, Input, Scope } from "@rocketseat/unform";
import Main from "./";

import './styles.css';

export default class FormProduct extends Component{

  initialData = {}

  handleSubmit = async (data) => {
    const response = await api.post('/products', data);
    
    const obj = new Main();
    obj.loadProducts();

    console.log(response);
  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit} initialData={this.initialData}>
        <Input name="title" />
        <Input name="description" />
        <Input name="url" />

        <button type="submit">Save</button>
      </Form>
    )
  }
}