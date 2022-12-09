import React, { Component, useState, useEffect,useRef } from "react";
import { TableHead, Typography, Button, Paper, Tooltip, Grid, TextField, Modal , List} from '@mui/material';
import useAuth from "../services/useAuth";
import { useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import moment from "moment";

function HomePage() {
    const { state } = useLocation();
    const {getCurrentUser} = useAuth();
    const loginCreds = getCurrentUser()

    const [isLoading, setIsLoading] = useState(true);    
    const [isSubmitting, setIsSubmitting] = useState('');    
    
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [fetchError, setFetchError] = useState('');
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        const config = {
            headers: {
                'x-auth-token':loginCreds.access_token
            }
        } 
        console.log("So the url is: ",process.env.REACT_APP_API_URL )
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

    return (
        <ThemeProvider theme={createTheme()}>
            {
            isLoading?<p>Loading...</p>
                     :<p>Loading...</p>
            }
        </ThemeProvider>
    )
}

export default HomePage;
