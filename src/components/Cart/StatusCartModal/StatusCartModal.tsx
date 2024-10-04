import React from 'react';
import { Box, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Cart {
    id: number;
    codigo: string;
    ativo: boolean;
}

interface StatusCartModalProps {
    open: boolean;
    onClose: () => void;
    cart: Cart | null;
    onEdit: (codigo: string) => void;
}

const distanceData = [
    { name: 'Dia 1', distance: 2 },
    { name: 'Dia 2', distance: 3 },
    { name: 'Dia 3', distance: 5 },
    { name: 'Dia 4', distance: 4 },
    { name: 'Dia 5', distance: 7 }
];

const batteryLevel = 65;
const batteryData = [
    { name: 'Nível Atual', value: batteryLevel },
    { name: 'Restante', value: 100 - batteryLevel },
];
interface ScannedItem {
    total: number;
    good: number;
    bad: number;
}

const scannedItems: { [key: string]: ScannedItem } = {
    bananas: {
        total: 3,
        good: 2,
        bad: 1,
    },
    macas: {
        total: 5,
        good: 3,
        bad: 2,
    }
};
const formatItemName = (item: string) => {
    if (item === 'macas') {
        return 'Maçãs';
    }
    return item.charAt(0).toUpperCase() + item.slice(1);
};

const COLORS = ['#0088FE', '#00C49F'];

const StatusCartModal: React.FC<StatusCartModalProps> = ({ open, onClose, cart }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-cart-modal"
            aria-describedby="edit-cart-modal-description"
        >
            <Box sx={{ boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5);', padding: 4, borderRadius: 1, width: 400, margin: '100px auto', backgroundColor: 'var(--cor-fundo)' }}>
                <Typography id="edit-cart-modal" variant="h6" component="h2">
                    Status do  Carrinho
                </Typography>
                <Typography
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '16px',
                        margin: '16px 0',
                        overflowX: 'auto',
                    }} variant="body1" component="pre">
                    ID do Carrinho: {cart?.id}
                </Typography>

                <Box className="container" sx={{ paddingTop: 2 }}>
                    <Typography variant="h6" component="h2">
                        Frutas Escaneadas
                    </Typography>
                    <List>
                        {Object.keys(scannedItems).map((item) => (
                            <ListItem
                                key={item}
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                            >
                                <ListItemText
                                    primary={formatItemName(item)}
                                    secondary={`Total: ${scannedItems[item].total}, Bom estado: ${scannedItems[item].good}, Mau estado: ${scannedItems[item].bad}`}
                                    secondaryTypographyProps={{ style: { color: 'white' } }}
                                />

                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                    Distância Percorrida (km)
                </Typography>
                <LineChart width={300} height={200} data={distanceData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="distance" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>

                <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                    Nível de Bateria (%)
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={batteryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {batteryData.map((entry, index) => (
                                <Cell key={`${entry.name}-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={24}>
                            {batteryLevel}%
                        </text>
                    </PieChart>
                </ResponsiveContainer>

            </Box>
        </Modal>
    );
};

export default StatusCartModal;
