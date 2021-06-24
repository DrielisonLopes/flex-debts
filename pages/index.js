import React, {useState, useEffect} from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import MainHeader from '../src/components/mainHeader';
import ClientForm from "../src/components/ClientForm";
import ClientList from "../src/components/ClientList";
import TotalList from "../src/components/TotalList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [dividas, setDividas] = useState([]);
  const [selectedDivida, setSelectedDivida] = useState();

  useEffect(()=> {
    fetchUsers()
    fetchDividas()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    setUsers(data)
  }

  const fetchDividas = async ()=> {
    const response = await fetch("https://provadev.xlab.digital/api/v1/divida/?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa")
    const data = await response.json()
    setDividas(data.result)
  }

  /**
   * @name deleteDivida
   * @description Filtra a divida no estado e faz delete request para API
   * @param {object} divida - divida para deletar
   * @return {void}
   */
  const deleteDivida = (divida) => {
    const dividasFilter = dividas.filter(dividaToDelete => dividaToDelete._id !== divida._id)
    setDividas(dividasFilter)
    fetch(`https://provadev.xlab.digital/api/v1/divida/${divida._id}?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa`,{
      method: "DELETE",
    }).then(response => console.log(response))

    return;
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Flex Debts</title>
      </Head>

      <MainHeader setSelectedUser={setSelectedDivida} users={users} />
      <ClientForm dividas={dividas} setDividas={setDividas} selectedDivida={selectedDivida} users={users} />
      <ClientList alteraDivida={alteraDivida} deleteDivida={deleteDivida} dividas={dividas} setSelectedDivida={setSelectedDivida} />
    </div>
  )
}
