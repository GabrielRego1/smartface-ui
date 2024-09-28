import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface AddCartModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (codigo: string) => void;
}

const AddCartModal: React.FC<AddCartModalProps> = ({ open, onClose, onAdd }) => {
    const [newCartCode, setNewCartCode] = useState('');
    const [error, setError] = useState(false);

    const handleAddCart = () => {
        if (newCartCode.trim() === '') {
            setError(true);
            return;
        }
        onAdd(newCartCode);
        setNewCartCode('');
        setError(false);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%' }}>
                <Typography variant="h6" component="h2" sx={{ color: '#363636' }}>
                    Adicionar Novo Cart
                </Typography>
                <input
                    type="text"
                    placeholder="Código do Cart"
                    value={newCartCode}
                    onChange={(e) => setNewCartCode(e.target.value)}
                    style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                />
                {error && <Typography color="error">Por favor, insira um código válido!</Typography>}
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleAddCart}>Salvar</Button>
                    <Button variant="outlined" onClick={onClose} sx={{ ml: 1, backgroundColor: '#white', color: 'black', '&:hover': { backgroundColor: '#bf2121',color:'var(--cor-texto)' }, }}>Cancelar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddCartModal;
