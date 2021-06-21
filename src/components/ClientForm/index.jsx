import React, { useEffect, useState } from 'react';
import styles from './clientForm.module.css';
import stylesHome from '../../../styles/Home.module.css';

export default function ClientForm({ users, selectedDivida}) {
  const [userId, setUserId] = useState(0);
  const [motivo, setMotivo] = useState("");
  const [valor, setValor] = useState("");
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if (selectedDivida) {
      setMotivo(selectedDivida.motivo)
      setValor(selectedDivida.valor)
      setUserId(selectedDivida.idUsuario)
      setUsuario(users.find(usuario => usuario.id == selectedDivida.idUsuario))
    }
  },[selectedDivida])

    // Consome dados da API JSONplaceholder,
    const register = (event)=> {
        event.preventDefault()
        console.log(selectedDivida)

        if (selectedDivida) {
          fetch(`https://provadev.xlab.digital/api/v1/divida/${selectedDivida._id}`,{
            method: "PUT",
            body: JSON.stringify({
              idUsuario: userId,
              motivo: motivo,
              valor: valor
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            }).then(response => alert("Atualizado com sucesso"))
        } else {
          fetch('https://provadev.xlab.digital/api/v1/divida/?uuid=0c17783c-087f-4b46-bc2b-38a43e1b9baa', {
              method: 'POST',
              body: JSON.stringify({
                idUsuario: userId,
                motivo: motivo,
                valor: valor
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => response.json())
              .then((json) => console.log(json));
        }
    }

    return  (
      <div>
        <main className={styles.main_content}>
        <section className={styles.main_content_section}>
          <h2> </h2>
        </section>
        <section className={styles.main_content_section}>
          <main className={stylesHome.main}>
            <div className={stylesHome.grid}>
              {selectedDivida ? <h1>Alterar Divida:</h1> : <h1>Incluir dívidas:</h1>}
              <form className={stylesHome.card} onSubmit={register}>
                <label htmlFor="search"><h3>Cliente: </h3></label>
                <select 
                  name="users"
                  id="users" 
                  className={stylesHome.client} 
                  onChange={(data)=> setUserId(data.target.value)}>

                  {selectedDivida ? <option value={usuario.id}>{usuario.name}</option> : <option value={0}>Usuários do JSONPlaceholder</option>}
                  {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>

                <label htmlFor="motivo"><h3>Motivo: </h3></label>
                <input 
                  className={stylesHome.client}
                  type="text" 
                  id="motivo" 
                  value={motivo}
                  placeholder="Ex: divida cartão de crédito" 
                  onChange={(event) => setMotivo(event.target.value)} />

                  <label htmlFor="valor" ><h3>Valor: </h3></label>
                  <input className={stylesHome.client} 
                  type="text" 
                  id="valor"
                  value={valor}
                  placeholder="Ex: 5000,00" 
                  onChange={(event) => setValor(event.target.value)} />

                  <button className={styles.limpar} type="reset">Limpar</button>
                  <button className={styles.registrar} type="submit">Salvar</button>  
              </form>
            </div>
          </main>
        </section>
        </main>
      </div>
    )
}
