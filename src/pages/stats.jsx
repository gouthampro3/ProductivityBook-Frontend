import React, { Component, useState, useEffect,useRef } from "react";
import { TableHead, Typography, Button, Paper, Grid, TextField, Modal , List} from '@mui/material';
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
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
    LineChart,
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    BarChart
} from 'recharts';
  

function StatsPage() {
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

    const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const pieData = [
        {
            "name": "Completed",
            "value": 16
        },
        {
            "name": "Postponed",
            "value": 12
        },
        {
            "name": "Pending",
            "value": 4
        },
        {
            "name": "OverDue",
            "value": 18
        },
    ];
    const PieCustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

    const lineData = [
        {
            month: 'July',
            completed: 48,
            pending: 12
        },
        {
            month: 'August',
            completed: 13,
            pending: 1
        },
        {
            month: 'Sept',
            completed: 22,
            pending: 9
        },
        {
            month: 'October',
            completed: 32,
            pending: 18
        },
        {
            month: 'November',
            completed: 19,
            pending: 6
        },
        {
            month: 'December',
            completed: 16,
            pending: 4
        }, 
      ]
    
    const barData = [
        {
          "month": "July",
          "you": 70,
          "others": 60
        },
        {
          "month": "August",
          "you": 30,
          "others": 80
        },
        {
          "month": "Sept",
          "you": 25,
          "others": 78
        },
        {
          "month": "October",
          "you": 88,
          "others": 76
        },
        {
          "month": "November",
          "you": 12,
          "others": 12
        },
        {
          "month": "December",
          "you": 90,
          "others": 90
        },
      ]

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
                                <Typography align="center" variant="h2" paddingBottom={1}>Stats</Typography>
                                <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'row',
                                            bgcolor: '#AEB6BF',
                                            borderRadius: 1,
                                        }
                                    } >
                                    <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: '#AEB6BF',
                                            p: 5,
                                            borderRadius: 1,
                                        }
                                    } >
                                        <Typography align="center" variant="h6" paddingBottom={1}>This Month Tasks</Typography>
                                        <PieChart width={300} height={300}>
                                            <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                                                {
                                                    pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                                                }
                                            </Pie>
                                            <Tooltip content={<PieCustomTooltip />} />
                                            <Legend />
                                        </PieChart>
                                    </Box>

                                    <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: '#AEB6BF',
                                            p: 5,
                                            borderRadius: 1,
                                        }
                                    } >
                                        <Typography align="center" variant="h6" paddingBottom={1}>Month Wise Completed vs Pending Tasks</Typography>
                                        <LineChart width={600} height={250} data={lineData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="pending" stroke="#8884d8" />
                                            <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                                        </LineChart>
                                    </Box>
                                </Box>
                                <Box sx={
                                        {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: '#AEB6BF',
                                            p: 5,
                                            borderRadius: 1,
                                        }
                                    } >
                                        <Typography align="center" variant="h6" paddingBottom={1}>Shared Task Completion Percentage</Typography>
                                        <BarChart width={730} height={250} data={barData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="you" fill="#8884d8" />
                                            <Bar dataKey="others" fill="#82ca9d" />
                                        </BarChart>
                                    </Box>
                            </Box>
                        </Box>
            }
        </ThemeProvider>
    )
}

export default StatsPage;
