import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import Container from '@mui/material/Container';
import TransactionChart from '../components/TransactionChart'

const Home = () => {

    const [transactions, setTransactions] = useState([])
    const [editTransaction, setEditTransaction] = useState({})
  
    useEffect(() => {
      fetchTransactions()
    }, []);

    async function fetchTransactions() {

      const token = Cookies.get('token');
      
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await res.json()
        setTransactions(data);
    
      }

  return (
    
    <Container>
      
        <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction}/>

        <TransactionsList 
         transactions={transactions}
         fetchTransactions={fetchTransactions} 
         setEditTransaction={setEditTransaction}
         />

      </Container>
    
  )
}

export default Home