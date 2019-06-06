import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { async } from 'q';

const ListaProdutos = (props) => {

    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        const result = async () =>{
            const response = await axios.get(`${BASE_URL}/products`);
            setListProduct(response.data);
        };
        result();
    });
    return (
        <section >
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Categorias</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct.map(product => (
                        <tr key={product._id} >
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                                <ul>
                                    {product.categories.map((categorie, index) => {
                                        return (<li key={index}> {categorie.title} </li>)
                                    })}
                                </ul>
                            </td>
                            <td>{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )

}

export default ListaProdutos