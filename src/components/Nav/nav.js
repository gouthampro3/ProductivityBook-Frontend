import React from "react";
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../services/useAuth'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function Nav () {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pages = ['Home']

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            PRODUCTIVITY BOOK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Button variant = 'contained' onClick = {()=>{navigate('/')}} sx={{ m:2, color: 'white', display: 'block', backgroundColor:'#000000' }}>Home</Button>
              <Button variant = 'contained' onClick = {()=>{navigate('/stats')}} sx={{ m: 2, color: 'white', display: 'block', backgroundColor:'#000000' }}>Stats</Button>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            PRODUCTIVITY BOOK
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button variant = 'contained' onClick = {()=>{navigate('/')}} sx={{ m:2, color: 'white', display: 'block', backgroundColor:'#000000' }}>Home</Button>
            <Button variant = 'contained' onClick = {()=>{navigate('/stats')}} sx={{ m: 2, color: 'white', display: 'block', backgroundColor:'#000000' }}>Stats</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant = 'contained' onClick = {handleLogout} sx={{ my: 2, color: 'white', display: 'block', backgroundColor:'#000000' }}>LogOut</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <nav>
    //   <ul>
    //     <li>
        
    //       <Link to="/">Home</Link>
    //     </li>
    //   </ul>
    //   {authed && (
    //     <Button onClick={handleLogout}>
    //       Logout
    //     </Button>
    //   )}
    // </nav>
  );
}