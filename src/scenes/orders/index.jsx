import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import React from 'react';
const Orders = ({ orders }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [games, setGames] = useState([]);

    // useEffect(() => {
    //     const fetchGames = async () => {    
    //         try {
    //             const response = await axios.get("https://echrily.shop/api/games");
    //             setGames(response.data);
    //         } catch (err) {
    //             console.error("Failed to fetch games");
    //         }
    //     };

    //     fetchGames();
    // }, []);
    const StyledChip = styled(Chip)(({ theme }) => ({
        justifyContent: 'left',
        '& .icon': {
            color: 'inherit',
        },
        '&.Completed': {
            color: (theme.vars || theme).palette.success.dark,
            border: `1px solid ${(theme.vars || theme).palette.success.main}`,
        },
        '&.Cancelled': {
            color: (theme.vars || theme).palette.error.dark,
            border: `1px solid ${(theme.vars || theme).palette.error.main}`,
        },
        '&.Pending': {
            color: (theme.vars || theme).palette.info.dark,
            border: `1px solid ${(theme.vars || theme).palette.info.main}`,
        }
    }));

    const Status = React.memo((props) => {
        const { status } = props;

        let icon = null;
        if (status === 'Cancelled') {
            icon = <ReportProblemIcon className="icon" />;
        } else if (status === 'Completed') {
            icon = <DoneIcon className="icon" />;
        } else {
            icon = <InfoIcon className="icon" />;

        }
        let label = status;
        return (
            <StyledChip
                className={status}
                icon={icon}
                size="small"
                label={label}
                variant="outlined"
            />
        );
    });
    const columns = [
        { field: "orderId", headerName: "Order ID" },
        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
            flex: 0.5,
        },

        {
            field: "email",
            flex: 0.5,
            headerName: "E-Mail",
        },
        {
            field: "phone",
            flex: 0.5,
            headerName: "Phone Number",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            flex: 1,
            field: "status",
            headerName: "Status",
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                    >
                        <Status status={status} />
                    </Box>
                );
            },
        },
        {
            flex: 1,
            field: "items",
            headerName: "Items",
            height:"100%",
            renderCell: ({ row: { items } }) => {
                return (
                    <Box
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="space-around"
                    >
                        {items.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography variant="h6">{item.name} | Qte:{item.quantity} | Price: {item.price}TND</Typography>
                                </Box>
                            )
                        })}
                    </Box>
                );
            },
        },

    ];

    return (
        <Box m="20px">
            <Header title="Orders" subtitle="Managing Orders" />
            <Box
                m="40px 0 0 0 "
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.blueAccent[500],
                        fontSize: "14px",
                        fontWeight: "bold",
                        flexShrink: "1"
                    },

                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.primary[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? colors.primary[700]
                                : colors.grey[900],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.blueAccent[500]} !important`
                    }
                }}
            >
                <DataGrid
                    checkboxSelection
                    getRowId={(row) => row.orderId}
                    rows={orders}
                    columns={columns}
                    rowHeight={130}
                    slots={{ toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Orders;