import React from 'react';
import styles from './TotalList.module.css';
import stylesHome from '../../../styles/Home.module.css';

export default function mainHeader() {
    return (
        <div>
            <main className={styles.main_content}>
                <section className={styles.main_content_section}>
                    <main className={stylesHome.main}>
                        <div className={stylesHome.grid}>
                            <h1>Total:</h1>
                            <div className={stylesHome.card} >
                                <table className={styles.table_total}>
                                    <thead>
                                        <tr>
                                            <th>Usuários</th>
                                            <th>Dividas</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Madara</td>
                                            <td>Alea jequetaesti</td>
                                            <td>100.00</td>
                                        </tr>
                                        <tr>
                                            <td>Ervin Howell</td>
                                            <td>Ante turpis integer aliquet porttitor.</td>
                                            <td>29.99</td>
                                        </tr>
                                        <tr>
                                            <td>Clementine Bauch</td>
                                            <td>Vis ac commodo adipiscing arcu aliquet.</td>
                                            <td>19.99</td>
                                        </tr>
                                        <tr>
                                            <td><strong>GERAL</strong></td>
                                            <td></td>
                                            <td>150</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </section>
            </main>
        </div>
    )
}
