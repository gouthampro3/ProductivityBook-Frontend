import React, { Component, useState } from "react";
import { Box, Modal, FormControl, InputLabel, Input, TextField, Paper, Grid, getPaperUtilityClass, Typography, Avatar, Button } from '@mui/material';
import useAuth from "../services/useAuth";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";


function SignUpPage() {
    console.log("So, Whats going on!: ", process.env);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [signupError, setsignupError] = React.useState('');
    const [signupSuccess, setsignupSuccess] = React.useState('');
    const handleOpen = (error) => {
        setsignupError(error)
        setOpen(true)
    };
    const handleSuccess = (successmsg) => {
        setsignupSuccess(successmsg)
        setOpenSuccess(true)
    };
    const handleClose = () => {
        setOpen(false)
        setsignupError('')
        setIsSubmitting(false)
    };

    const handleCloseSuccess = () => {
        setsignupSuccess('')
        setOpenSuccess(false)
        setIsSubmitting(false)
        navigate('/login');
    };

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)
        const responseData = await signup(firstname,lastname,email,password,cnfPassword)
        if (responseData.status == "success") {
            handleSuccess(responseData.message)
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
                    <form onSubmit={handleSignUp}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="First Name" id="firstanme" onChange={(e)=>{setFirstname(e.target.value)}} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Last Name" id="lastname" onChange={(e)=>{setLastname(e.target.value)}} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Email" id="email" type="email" onChange={(e)=>{setEmail(e.target.value)}} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Password" id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField label="Confirm Password"  id="cnfpassword" type="password" onChange={(e)=>{setCnfPassword(e.target.value)}} fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button type="submit" color='success' variant='outlined' fullWidth disabled={isSubmitting}>Register</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button onClick={()=>{ navigate('/login')}} color='success' variant='outlined' fullWidth disabled={isSubmitting}>SignIn</Button>
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
                    <Typography variant="body1" id="modal-title" sx={{ mb: 2 }}>{signupError}</Typography>
                    <Button color = 'error' variant = 'outlined' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            <Modal
                open={openSuccess}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <Box sx={modalStyle} spacing={2}>
                    <Typography variant="body1" id="modal-title" sx={{ mb: 2 }}>{signupSuccess}</Typography>
                    <Button color = 'success' variant = 'outlined' onClick={handleCloseSuccess}>Close</Button>
                </Box>
            </Modal>
        </Paper>
    )
}

export default SignUpPage;
