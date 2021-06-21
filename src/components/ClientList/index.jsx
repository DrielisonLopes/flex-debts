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
                            <h1>Detalhes:</h1>
                        <div className={stylesHome.card} >          
                            <ol className={styles.list}>
                                {dividas.map((divida) => (
                                    <>
                                        <table className={styles.tabela}>
                                            <tr>
                                                <td>Usuário</td>
                                                <td>Motivo</td>
                                                <td>Valor</td>
                                            </tr>
                                            <tr>    
                                                <td key={divida.idUsuario}>{divida.idUsuario}</td>
                                                <td key={divida.idUsuario}>{divida.motivo}</td>
                                                <td key={divida.idUsuario}>{divida.valor}</td>
                                                {/* <td key={divida.idUsuario}>{divida.criado}</td> */}
                                            </tr>
                                        </table>
                                        <button onClick={() => showDetails(divida)}>Detalhes</button>
                                        <button className={styles.alterar} onClick={() => alteraDivida(divida)} >Alterar</button>
                                        <button className={styles.deletar} onClick={() => deleteDivida(divida)} >Deletar</button>
                                    </>
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
