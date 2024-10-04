import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert, Switch, IconButton, Typography } from '@mui/material';
import AddCartModal from '../AddCartModal/AddCartModal';
import DeleteIcon from '@mui/icons-material/Delete';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom';
import StatusCartModal from '../StatusCartModal/StatusCartModal';

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
];

const CartList: React.FC = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState<Cart[]>(initialCarts);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null); 
  const [editedCodigo, setEditedCodigo] = useState<string>(''); 

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleOpenEditModal = (cart: Cart) => {
    setSelectedCart(cart);
    setEditedCodigo(cart.codigo); 
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

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

  const handleEditCart = () => {
    if (selectedCart) {
      setCarts(carts.map(cart => cart.id === selectedCart.id ? { ...cart, codigo: editedCodigo } : cart));
      handleCloseEditModal();
      setSuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setError(false);
    setSuccess(false);
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <Box sx={{ padding: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5);', minWidth: '100vh' }}>
      <Box className="box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
        <IconButton onClick={handleRedirect}>
          <KeyboardReturn sx={{ color: 'white' }} />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'var(--cor-botao)' }}>
          Lista de Carrinhos
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: 'var(--cor-fundo)' }} className='table-container'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'var(--cor-texto)' }}>ID</TableCell>
              <TableCell sx={{ color: 'var(--cor-texto)' }}>Código</TableCell>
              <TableCell sx={{ color: 'var(--cor-texto)' }}>Ativo</TableCell>
              <TableCell sx={{ color: 'var(--cor-texto)' }}>Status</TableCell>
              <TableCell sx={{ color: 'var(--cor-texto)' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell sx={{ color: 'var(--cor-texto)' }}>{cart.id}</TableCell>
                <TableCell sx={{ color: 'var(--cor-texto)' }}>{cart.codigo}</TableCell>
                <TableCell>
                  <Switch
                    sx={{
                      ".MuiSwitch-thumb": {
                        backgroundColor: "var(--cor-botao)"
                      },
                      ".MuiSwitch-track": {
                        backgroundColor: "#e8e8e8"
                      },
                      "& .MuiSwitch-switchBase": {
                        "&.Mui-checked": {
                          "+ .MuiSwitch-track": {
                            backgroundColor: "white"
                          },
                        }
                      }
                    }}
                    checked={cart.ativo}
                    onChange={() => handleToggleActive(cart.id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEditModal(cart)}>
                    <BatteryChargingFullIcon />
                  </IconButton>
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
        <Button variant="outlined" sx={{ ml: 1, color: 'var(--cor-texto)', borderColor: 'var(--cor-botao)' }} onClick={handleOpen}>Adicionar Cart</Button>
      </Box>

      <StatusCartModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        cart={selectedCart}
        onEdit={handleEditCart}
      />


      <Snackbar open={error || success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error ? 'Por favor, insira um código válido!' : 'Cart atualizado com sucesso!'}
        </Alert>
      </Snackbar>
    </Box >
  );
}

export default CartList;
