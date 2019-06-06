import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';

const Principal = props => {  

    return (
        <section>
            <section className='resumo'>
                <div className='min-box bg-default'>
                    <h1>100</h1>
                    <p><small>Usuários do sistema</small></p>
                </div>
                <div className='min-box bg-primary'>
                    <h1>100</h1>
                </div>
                <div className='min-box bg-alter'>
                    <h1>100</h1>
                    <p><small>aqui fica um teste de acordo com o conteúdo dentro da caixa</small></p>
                </div>
            </section>
            <section className=''>
                
            </section>
        </section>
    )
}

export default Principal