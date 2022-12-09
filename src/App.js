import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignUpPage from './pages/signup'
import RequireAuth from './services/requiredAuth';
import Nav from './components/Nav/nav';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from '@mui/material/CssBaseline';
import StatsPage from './pages/stats';

function App() {
  return (
    <ThemeProvider theme={
      createTheme({
        palette: {
          background: {
            default: "#282c34"
          }
        }      
      })
    }>
      <CssBaseline/>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
                  <RequireAuth>
                    <Nav/>
                    <HomePage />
                  </RequireAuth>
              } 
            />
            <Route path="/stats" element={
                  <RequireAuth>
                    <Nav/>
                    <StatsPage />
                  </RequireAuth>
              } 
            />
            <Route path="/signup" element={
                  <SignUpPage />
              } 
            />
            <Route path="/login" element={<LoginPage/>} />
            {/* <Route path="invoices" element={<Invoices />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
