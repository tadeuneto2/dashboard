import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import { BASE_URL } from '../../../config';

const ListaProdutos = (props) => {

    // hooks que contem as listas
    const [listProduct, setListProduct] = useState([])
    const [listCategories, setListCategorie] = useState([])
    const [activeItem, setActiveItem] = useState(false)
    const [classNameItem, setClassNameItem] = useState('active')

    // carrega a lista de produtos e a lista de categorias no select
    const resultProduct = async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        setListProduct(response.data);
        const response2 = await axios.get(`${BASE_URL}/categories`);
        setListCategorie(response2.data);
    };

    // recupera os produtos por categoria [MELHORAR PARA SELEÇÃO MULTIPLA DEPOIS]
    const getCategories = async (route) => {
        const response = await axios.get(`${BASE_URL}/${route}`);
        setListProduct(response.data);
    }

    // semelhante ao componentDidMount
    useEffect(() => {
        resultProduct();
    }, []);

    // recupera o id selecionado no Select e faz uma requisição para o servidor buscando por categorias
    function handleChange(event) {
        const id = event.target.value
        if (id == '00') {
            resultProduct();
        } else {
            getCategories(`products/categories/${id}`)
        }
    }

    function handleClass(status) {
        return status ?  "active" : "inactive";
    }

    function handleActive(id,status){              
            axios({
                method:'put',
                url:`${BASE_URL}/products/status/${id}`,
                data:{"active":status},
                headers:  {'Content-Type': 'application/json'}
            })
            .then(response => {
                resultProduct()
            })
            .catch(er => {
                console.log('error: ', er)
            })
        // setListProduct(response.data);
    }

    return (
        <section>
            <section className='filterTable'>
                <div>
                    <input type='text' />
                </div>
                <div>
                    <label>Filtra por: </label>
                    <select onChange={handleChange} defaultValue={{ value: '00' }} >
                        <option value='00' >Tudo</option>
                        {listCategories.map((categorie) => (
                            <option key={categorie._id} value={categorie._id} > {categorie.title}</option>
                        ))}
                    </select>
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
                            <th colSpan='2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map(product => (
                            <tr key={product._id} >
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>
                                {product.categories.map((categorie, index) => {
                                            return (<span key={index}> {categorie.title} - </span>)
                                        })}
                                    {/* <ul>
                                        {product.categories.map((categorie, index) => {
                                            return (<li key={index}> {categorie.title} </li>)
                                        })}
                                    </ul> */}
                                </td>
                                <td>{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                <td>
                                    <span className='iconsButtons' onClick={()=> handleActive(product._id, product.active)}>
                                        <FontAwesomeIcon icon={faCheckCircle} className={handleClass(product.active)} />
                                    </span>
                                </td>
                                <td>
                                    <span className='iconsButtons'>
                                        <FontAwesomeIcon icon={faEdit} className='edit' />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section> // fim da section que contem tudo
    )// fim do return 

}// fim da function listaProdutos

export default ListaProdutos;