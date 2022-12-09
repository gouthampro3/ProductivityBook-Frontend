import React, { Component, useState } from "react";
import { Box, Modal, FormControl, InputLabel, Input, TextField, Paper, Grid, getPaperUtilityClass, Typography, Avatar, Button } from '@mui/material';
import useAuth from "../services/useAuth";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');
    const handleOpen = (error) => {
        setLoginError(error)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        setLoginError('')
        setIsSubmitting(false)
    };

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)
        const responseData = await login(username, password)
        if (responseData.status == "success") {
            navigate('/')
        }
        else {
            handleOpen(responseData.message)
        }
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
    const paperStyle = {
        padding: "20px",
        width: "350px",
        margin: "100px auto"
    }
    const loginIconStyle = {
        backgroundColor: 'green'
    }
    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid container spacing={3} align="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Avatar style={loginIconStyle}><LockOutlined /></Avatar>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h4">PRODUCTIVITY BOOK</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Username" id="username" onChange={handleUsernameChange} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Password" id="password" type="password" onChange={handlePasswordChange} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button type="submit" color='success' variant='outlined' fullWidth disabled={isSubmitting}>Sign In</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button onClick={()=>{ navigate('/signup')}} color='success' variant='outlined' fullWidth disabled={isSubmitting}>Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <Box sx={modalStyle} spacing={2}>
                    <Typography variant="body1" id="modal-title" sx={{ mb: 2 }}>{loginError}</Typography>
                    <Button color = 'error' variant = 'outlined' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </Paper>
    )
}

export default LoginPage;
