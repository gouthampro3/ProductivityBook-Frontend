import React, { Component, useState, useEffect,useRef } from "react";
import { TableHead, Typography, Button, Paper, Tooltip, Grid, TextField, Modal , List, IconButton} from '@mui/material';
import useAuth from "../services/useAuth";
import { useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import moment from "moment";
import { CalendarPicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import _ from 'lodash';
import CheckIcon from '@mui/icons-material/Check';

function HomePage() {
    const { state } = useLocation();
    const {getCurrentUser} = useAuth();
    const loginCreds = getCurrentUser()

    const [isLoading, setIsLoading] = useState(true);    
    const [isSubmitting, setIsSubmitting] = useState('');    
    
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [fetchError, setFetchError] = useState('');

    const [todos, setTodos] = useState([]);
    const [todosShared, setTodosShared] = useState([]);

    const [todosToday, setTodosToday] = useState([]);
    const [todosSharedToday, setTodosSharedToday] = useState([]);

    const [dateVal,setDateVal] = useState(dayjs());
    const [todoSubject,setTodoSubject] = useState('');

    const [completeText, setCompleteText] = useState('Complete');

    const navigate = useNavigate();
    
    const config = {
        headers: {
            'x-auth-token':loginCreds.access_token
        }
    } 

    useEffect(()=>{
        console.log("So the url is: ",process.env.REACT_APP_API_URL );
        axios.get(process.env.REACT_APP_API_URL+"/api/todos",config).then(
            (response)=>{
                setTodos(response.data.body.own);
                setTodosShared(response.data.body.shared)

                let event = dayjs()
                let dataToday = {own:[], shared:[]}
                dataToday.own = _.filter(response.data.body.own,(todo)=>{
                    if(todo.due.substring(0,10) == event.format('YYYY-MM-DD'))
                        return true
                    return false
                } );
                dataToday.shared = _.filter(response.data.body.shared,(todo)=>{
                    if(todo.due.substring(0,10) == event.format('YYYY-MM-DD'))
                        return true
                    return false
                } );
                setTodosToday(dataToday.own);
                setTodosSharedToday(dataToday.shared);

                setIsLoading(false);
            },
        ).catch((error)=>{
            setIsLoading(false);
            handleOpen(error.response.data.error);
        });
        setIsLoading(false);
    }, []) 

    const handleOpen = (error) => {
        setFetchError(error)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        setFetchError('')
        setIsSubmitting(false)
    };


    const handleDeleteClose = (value, tableMeta)=>{
        setIsSubmitting(false)
        setDeleteOpen(false)
    }

    const handleDateChange = (event)=>{
        setDateVal(event)
        let dataToday = {own:[], shared:[]}
        dataToday.own = _.filter(todos,(todo)=>{
            if(todo.due.substring(0,10) == event.format('YYYY-MM-DD'))
                return true
            return false
        } );
        dataToday.shared = _.filter(todosShared,(todo)=>{
            if(todo.due.substring(0,10) == event.format('YYYY-MM-DD'))
                return true
            return false
        } );
        setTodosToday(dataToday.own);
        setTodosSharedToday(dataToday.shared);
    }

    const handleTodoSubmit = ()=>{
        axios.put(process.env.REACT_APP_API_URL+"/api/todos", {
            subject:todoSubject,
            due:dateVal.format('YYYY-MM-DD')
        }, config).then(
            (response)=>{
                setIsSubmitting(false);
                setTodos([...todos,response.data.body]);

                let event = dateVal
                let dataToday = {own:[]}
                dataToday.own = _.filter([...todos,response.data.body],(todo)=>{
                    if(todo.due.substring(0,10) == event.format('YYYY-MM-DD'))
                        return true
                    return false
                } );
                setTodosToday(dataToday.own);
            },
        ).catch((error)=>{
            setIsSubmitting(false);
            handleOpen(error.response.data.error);
        });
    }

    const handleStatusChange = (todoid)=>{
        console.log("Called the handler")
        let i = _.findIndex(todosToday, function(todo) { return todo._id == todoid })
        let data = todosToday
        data[i].status = 'complete'
        setTodosToday(data)
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log(todosToday);
    return (
        <ThemeProvider theme={createTheme({
            
        })}>
            {
                isLoading?<p>Loading...</p>
                        :<Box>
                            
                            <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 5,
                                            m: 5,
                                            bgcolor: '#AEB6BF',
                                            borderRadius: 1,
                                        }
                                    } paddingTop={5} paddingLeft={5} paddingRight={5} >
                                <Typography align="center" variant="h2" paddingBottom={1}>ToDos</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <CalendarPicker
                                            openTo="day"
                                            date={dateVal}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                </LocalizationProvider>                                
                                <form onSubmit={()=>{}}>
                                    <Grid item xs={12} sm={12} md={12} paddingTop={1}>
                                        <TextField label="Type in a Todo" id="todo" onChange={(e)=>{setTodoSubject(e.target.value)}} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} paddingTop={1}>
                                        <Button onClick={handleTodoSubmit} color='success' variant='outlined' fullWidth disabled={isSubmitting}>Add ToDo</Button>
                                    </Grid>
                                </form>
                                
                            </Box>
                            <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 5,
                                            m: 5,
                                            bgcolor: '#AEB6BF',
                                            borderRadius: 1,
                                        }
                                    } paddingTop={5} paddingLeft={5} paddingRight={5} >
                                    
                                    
                                    <Box paddingTop={2}>
                                        <Typography align="center" variant="h4" >My Todos</Typography>
                                        <Box sx={
                                            {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 1,
                                                m: 1,
                                                bgcolor: '#AEB6BF',
                                                borderRadius: 1,
                                            }
                                        }>
                                            {todosToday.map((todo)=>{
                                                return <Paper key={todo._id} elevation={12}
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: "#FB927B",
                                                  border: "1px solid black",
                                                  margin: 8
                                                }}>
                                                    <Typography align="center" variant="h6" >{todo.subject}</Typography>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='success' align='center'
                                                        onClick={()=>{handleStatusChange(todo._id)}}>
                                                        {todo.status=='Complete'?"Undo-Complete":'Complete'}
                                                    </Button>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='error' align='center'>Delete</Button>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='warning' align='center'>Edit</Button>
                                                </Paper>
                                                // return <Typography align="center" variant="h6" key={todo._id}>{todo.subject}</Typography>
                                            })}
                                        </Box>
                                    </Box>
                                    <Box paddingTop={2}>
                                        <Typography align="center" variant="h4" >Shared With Me</Typography>
                                        <Box sx={
                                            {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 1,
                                                m: 1,
                                                bgcolor: '#AEB6BF',
                                                borderRadius: 1,
                                            }
                                        }>
                                            {todosSharedToday.map((todo)=>{
                                                return <Paper key={todo._id} elevation={12}
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: "#FB927B",
                                                  border: "1px solid black",
                                                  margin: 8
                                                }}>
                                                    <Typography align="center" variant="h6" >{todo.subject}</Typography>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='success' align='center'
                                                        onClick={()=>{handleStatusChange(todo._id)}}>
                                                        {todo.status=='Complete'?"Undo-Complete":'Complete'}
                                                    </Button>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='error' align='center'>Delete</Button>
                                                    <Button style={{
                                                        padding: 8,
                                                        margin: 8
                                                        }} variant="contained" color='warning' align='center'>Edit</Button>
                                                </Paper>
                                            })}
                                        </Box>
                                    </Box>
                            </Box>
                        </Box>
            }
        </ThemeProvider>
    )
}

export default HomePage;
