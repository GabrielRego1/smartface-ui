import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert, Switch, IconButton, Typography } from '@mui/material';
import AddCartModal from '../AddCartModal/AddCartModal';
import DeleteIcon from '@mui/icons-material/Delete';
interface Cart {
  id: number;
  codigo: string;
  ativo: boolean;
}

const initialCarts: Cart[] = [
  { id: 1001, codigo: 'CART001', ativo: true },
  { id: 1002, codigo: 'CART002', ativo: false },
  { id: 1003, codigo: 'CART003', ativo: false },
  { id: 1004, codigo: 'CART004', ativo: true },
  { id: 1005, codigo: 'CART005', ativo: true },
  { id: 1006, codigo: 'CART006', ativo: true },
  { id: 1007, codigo: 'CART007', ativo: false },
  { id: 1008, codigo: 'CART008', ativo: true },
];

const CartList: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>(initialCarts);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleAddCart = (codigo: string) => {
    const newCart: Cart = { id: carts.length + 1, codigo, ativo: true };
    setCarts([...carts, newCart]);
    setSuccess(true);
  };

  const handleToggleActive = (id: number) => {
    setCarts(carts.map(cart => cart.id === id ? { ...cart, ativo: !cart.ativo } : cart));
  };

  const handleDelete = (id: number) => {
    setCarts(carts.filter(cart => cart.id !== id));
  };

  const handleCloseSnackbar = () => {
    setError(false);
    setSuccess(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      
      <Box className="box" sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'var(--cor-texto)' }}>Lista de Carrinhos</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: '#cfcfcf' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.id}</TableCell>
                <TableCell>{cart.codigo}</TableCell>
                <TableCell>
                  <Switch
                    checked={cart.ativo}
                    onChange={() => handleToggleActive(cart.id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(cart.id)}>
                    <DeleteIcon sx={{ color: '#bf2121' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCartModal
        open={openModal}
        onClose={handleClose}
        onAdd={handleAddCart}
      />
      <Box className="box" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" onClick={handleOpen}>Adicionar Cart</Button>
      </Box>
      <Snackbar open={error || success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error ? 'Por favor, insira um código válido!' : 'Cart adicionado com sucesso!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CartList;