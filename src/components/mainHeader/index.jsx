import React from 'react';
import styles from './mainHeader.module.css';

export default function mainHeader({users, setSelectedUser}) {
    return (
        <div> 
            <header className={styles.main_Header}>
                <a href="./" className={styles.main_header_link}>
                    <h1>📉 Flex Debts</h1>
                </a>
                <div>
                    <h1 className={styles.main_header_title}>
                        <button className={styles.btnUsers}> Usuários</button>
                    </h1>
                    <ul className={styles.user_list}>       {/* substituir pela rota Detalhes */}
                        {users.map(user => <li key={user.id} onClick={() => setSelectedUser(user)}>{user.name}</li>)}
                    </ul>
                </div>
                <div>
                    <h1 className={styles.main_header_title}>
                        <button className={styles.btnUsers}> Detalhes</button>
                    </h1>
                </div>
                {/* Tabela com os valores totais de todas as dívidas */}
                {/* <div> */}
                    {/* <h1 className={styles.main_header_title}> */}
                        {/* <button className={styles.btnUsers}> Total</button> */}
                    {/* </h1> */}
                {/* </div> */}
            </ header>
        </div>
    );
}
