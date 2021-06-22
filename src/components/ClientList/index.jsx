import React, { useEffect, useState } from 'react';
import styles from './clientList.module.css';
import stylesHome from '../../../styles/Home.module.css';

export default function ClientList({ setSelectedDivida }) {
    const [dividas, setDividas] = useState([]);
    const [details, setDetails] = useState({});

    /**
     * @description Consome dividas da API transforma em JSON para pegar resultados e atualiza estado do componente
     */
    useEffect(()=> {
        fetch("https://provadev.xlab.digital/api/v1/divida/?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa")
            .then(response => response.json())
            .then(data => {
                setDividas(data.result)
            })
    }, [])

    /**
     * @name deleteDivida
     * @description Filtra a divida no estado e faz delete request para API
     * @param {object} divida - divida para deletar
     * @return {void}
     */
    const deleteDivida = (divida) => {
        const dividasFilter = dividas.filter(dividaToDelete => dividaToDelete._id !== divida._id)
        setDividas(dividasFilter)
        fetch(`https://provadev.xlab.digital/api/v1/divida/${divida._id}`,{
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => console.log(response))

        return;
    }
    
    /**
     * @name showDetails
     * @description Mostra detalhes da divida fazendo request na API pra pegar detalhes do usuario
     * @param {object} divida - Divida para mostrar detalhes
     * @return {void}
     */
    const showDetails = async (divida) => {
        const responseUser = await fetch(`https://jsonplaceholder.typicode.com/users/${divida.idUsuario}`)
        const user  = await responseUser.json()

        const responseDivida = await  fetch(`https://provadev.xlab.digital/api/v1/divida/${divida._id}?uuid=${divida.uuid}`)
        const dataDivida = await responseDivida.json()

        alert(`Usuário ${user.name} por ${dataDivida.result.motivo} deve R$${dataDivida.result.valor}`)
    }
    
    /**
     * @name alteraDivida
     * @description Altera divida no estado e manda PUT request para API
     * @return {void}
     * 
     */
    const alteraDivida = (divida) => {

        setSelectedDivida(divida)
        
    }

    return  (
        <div>   
            <main className={styles.main_content}>
                <section className={styles.main_content_section}>
                    <main className={stylesHome.main}>
                        <div className={stylesHome.grid}>
                        <div className={stylesHome.card} >          
                            <h1>Detalhes:</h1>
                            <ol className={styles.list}>
                            <table className={styles.tabela}>
                                <tr>
                                    <th>#</th>
                                    <th>Motivo</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Detalhes</th>
                                    <th>Alterar</th>
                                    <th>Deletar</th>
                                </tr>
                                </table>
                                {dividas.map((divida) => (
                                    <div key={divida._id}>
                                        <table className={styles.tabela}>
                                            <tr>    
                                                <td key={divida.idUsuario}>{divida.idUsuario}</td>
                                                <td key={divida.idUsuario}>{divida.motivo}</td>
                                                <td key={divida.idUsuario}>{divida.valor}</td>
                                                {/* <td key={divida.idUsuario}>{divida.criado}</td> */}
                                                <td key={divida.idUsuario}>21-06-2021</td>
                                                <td><button title="Detalhes" onClick={() => showDetails(divida)}>📋</button></td>
                                                <td><button className={styles.alterar} title="Alterar" onClick={() => alteraDivida(divida)} >📝</button></td>
                                                <td><button className={styles.deletar} title="Deletar" onClick={() => deleteDivida(divida)} >❌</button></td>
                                            </tr>
                                        </table>
                                    </div>
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
