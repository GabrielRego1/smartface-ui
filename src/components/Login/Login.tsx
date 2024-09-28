import { Box, Button, FormControl, Input, Typography } from '@mui/material';
import './Login.css';

function Login() {
    return (
        <Box className="container login">
            <Box className="box">
                <FormControl>
                    <Typography variant="h6">
                        Usuário
                    </Typography>
                    <Input></Input>
                </FormControl>
            </Box>
            <Box className="box">
                <FormControl>
                    <Typography variant="h6">
                        Senha
                    </Typography>
                    <Input></Input>
                </FormControl>
            </Box>
            <Button variant="outlined">Entrar</Button>
        </Box>
    )
}
export default Login