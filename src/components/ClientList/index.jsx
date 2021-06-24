import React, { useEffect, useState } from 'react';
import styles from './clientList.module.css';
import stylesHome from '../../../styles/Home.module.css';

export default function ClientList({ dividas, alteraDivida, deleteDivida }) {
    const [details, setDetails] = useState({});
    /**
     * @name showDetails
     * @description Mostra detalhes da divida fazendo request na API pra pegar detalhes do usuario
     * @param {object} divida - Divida para mostrar detalhes
     * @return {void}
     */
    const showDetails = async (divida) => {
        const responseUser = await fetch(`https://jsonplaceholder.typicode.com/users/${divida.idUsuario}?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa`)
        const user  = await responseUser.json()

        const responseDivida = await  fetch(`https://provadev.xlab.digital/api/v1/divida/${divida._id}?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa`)
        const dataDivida = await responseDivida.json()

        alert(`Usuário ${user.name} por ${dataDivida.result.motivo} deve R$${dataDivida.result.valor}`)
    }

    const formatDate = (date) => {
        const formatDate = new Date(date)
        return date;
    }

    return  (
        <div>   
            <main className={styles.main_content}>
                <section className={styles.main_content_section}>
                    <main className={stylesHome.main}>
                        <div className={stylesHome.grid}>
                        <div className={stylesHome.card} >          
                            <h1>Detalhes</h1>
                            <ol className={styles.list}>
                            <table className={styles.tabela}>
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th>Motivo</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                        <th>Detalhes</th>
                                        <th>Alterar</th>
                                        <th>Deletar</th>
                                    </tr>
                                    </tbody>
                                </table>
                                {dividas.map((divida) => (
                                    <table key={divida._id} className={styles.tabela}>
                                        <tbody>
                                            <tr>
                                                <td>{divida.idUsuario}</td>
                                                <td>{divida.motivo}</td>
                                                <td>{divida.valor}</td>
                                                <td>{formatDate(divida.criado)}</td>
                                                <td>
                                                    <button 
                                                        title="Detalhes" 
                                                        onClick={() => showDetails(divida)}>📋
                                                    </button>
                                                </td>
                                                <td>
                                                    <button 
                                                        className={styles.alterar} 
                                                        title="Alterar" 
                                                        onClick={() => alteraDivida(divida)} >📝
                                                    </button>
                                                </td>
                                                <td>
                                                    <button 
                                                        className={styles.deletar} 
                                                        title="Deletar" 
                                                        onClick={() => deleteDivida(divida)} >❌
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </ol>
                        </div>
                        </div>
                    </main>
                </section>
            </main>
        </div>
    )
}
