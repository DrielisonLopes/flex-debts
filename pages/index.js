import React, {useState, useEffect} from "react"
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import MainHeader from '../src/components/mainHeader';
import ClientForm from "../src/components/ClientForm"
import ClientList from "../src/components/ClientList"
import TotalList from "../src/components/TotalList"

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedDivida, setSelectedDivida] = useState();

  useEffect(()=> {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    setUsers(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Flex Debts</title>
      </Head>

      <MainHeader setSelectedUser={setSelectedDivida} users={users} />
      <ClientForm selectedDivida={selectedDivida} users={users} />

      <ClientList setSelectedDivida={setSelectedDivida} />
      {/* <TotalList /> */}

    </div>
  )
}
