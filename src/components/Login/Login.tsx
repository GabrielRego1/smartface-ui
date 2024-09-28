import { Alert, Box, Button, FormControl, Input, Snackbar, Typography } from '@mui/material';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (username === '' || password === '') {
            setError(true);
            return;
        }
        setSuccess(true);
        navigate('carts')
    };

    const handleCloseSnackbar = () => {
        setError(false);
        setSuccess(false);
    };

    return (
        <Box className="container login">
            <Box className="box">
                <FormControl>
                    <Typography variant="h6">
                        Usuário
                    </Typography>
                    <Input     sx={{ color: 'white', '&::placeholder': { color: 'white' }, borderColor: 'white' }}
                     placeholder="Digite seu usuário" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
            </Box>
            <Box className="box">
                <FormControl>
                    <Typography variant="h6">
                        Senha
                    </Typography>
                    <Input     sx={{ color: 'white', '&::placeholder': { color: 'white' }, borderColor: 'white' }}
                     placeholder="Digite sua senha" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
            </Box>
            <Button variant="outlined" onClick={handleLogin}>Entrar</Button>
            <Snackbar open={error || success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                    {error ? 'Por favor, preencha todos os campos!' : 'Login bem-sucedido!'}
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default Login