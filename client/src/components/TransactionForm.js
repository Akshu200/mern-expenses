import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'js-cookie'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux'


const initialForm = {

    amount: '',
    description: "",
    date: new Date(),
    category_id: '',
}


export default function TransactionForm({ fetchTransactions, editTransaction }) {


    // const { categories } = useSelector((state) => state.auth.user);

    const token = Cookies.get('token')
    const [form, setForm] = useState(initialForm);
 
   

    useEffect(() => {
        if (editTransaction.amount !== undefined) {

            setForm(editTransaction)
        }
    }, [editTransaction])

    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleDelete(newValue) {
        setForm({ ...form, date: newValue })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = editTransaction.amount === undefined ? create() : update();

        function reload(res) {
            if (res.ok) {
                setForm(initialForm)
                fetchTransactions()
            }
        }



        async function create() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            reload(res);
        }
        async function update() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            reload(res);
        }
    }

    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6">
                    Add new Item
                </Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex" }} >

                    <TextField
                        sx={{ marginRight: 5 }}
                        id="outlined-basic"
                        size="small"
                        name="amount"
                        onChange={handleChange}
                        value={form.amount}
                        label="Amount"
                        variant="outlined" />

                    <TextField
                        sx={{ marginRight: 5 }}
                        id="outlined-basic"
                        size="small"

                        name="description"
                        onChange={handleChange}
                        value={form.description}

                        label="Description"
                        variant="outlined" />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Transaction Date"
                            inputFormat="MM/DD/YYYY"


                            onChange={handleDelete}
                            value={form.date}

                            renderInput={(params) => <TextField sx={{ marginRight: 5 }} size="small" {...params} />}
                        />
                    </LocalizationProvider>



                    {
                        editTransaction.amount !== undefined && (
                            <Button type='submit' variant="secondary">update</Button>)
                    }
                    {
                        editTransaction.amount === undefined && (
                            <Button type='submit' variant="contained">submit</Button>)
                    }
                </Box>
            </CardContent>

        </Card>
    );
}