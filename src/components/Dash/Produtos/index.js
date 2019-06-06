import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';

const ListaProdutos = (props) => {

    const [listProduct, setListProduct] = useState([])
    const [listCategories, setListCategorie] = useState([])

    useEffect(() => {
        const resultProduct = async () => {
            const response = await axios.get(`${BASE_URL}/products`);
            setListProduct(response.data);
            const response2 = await axios.get(`${BASE_URL}/categories`);
            setListCategorie(response2.data);
        };
        resultProduct();
    }, []);

    function handleChange (event){
        const id = event.target.value
        console.log(id)
    }
    return (
        <section>
            <section className='filterTable'>

                <div>
                    <input type='text' />
                </div>
                <div>
                    <p>Filtrar tabela por</p>
                        {listCategories.map((categorie) => (
                            <span>
                           <input key={categorie._id} type='checkbox' value={categorie._id} onChange={handleChange} /> <label>{categorie.title}</label>
                            </span>
                        ))}
                </div>



            </section>
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
        </section>

    )

}

export default ListaProdutos