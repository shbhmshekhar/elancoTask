import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';

import { ROOT, Order, HeadCell } from '../../models';

interface TableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ROOT) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    
  }

  const  CustomTableHead = (props: TableHeadProps) => {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof ROOT) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
      const headCells: readonly HeadCell[] = [
        {
          id: "ConsumedQuantity",
          numeric: false,
          disablePadding: true,
          label: 'ConsumedQuantity',
        },
        {
          id: 'Cost',
          numeric: true,
          disablePadding: false,
          label: 'Cost',
        },
        {
          id: 'Date',
          numeric: true,
          disablePadding: false,
          label: 'Date',
        },
        {
          id: 'InstanceId',
          numeric: true,
          disablePadding: false,
          label: 'InstanceId',
        },
        {
          id: 'MeterCategory',
          numeric: true,
          disablePadding: false,
          label: 'MeterCategory',
        },{
            id: 'ResourceGroup',
            numeric: true,
            disablePadding: false,
            label: 'ResourceGroup',
          },{
            id: 'ResourceLocation',
            numeric: true,
            disablePadding: false,
            label: 'ResourceLocation',
          },{
            id: 'UnitOfMeasure',
            numeric: true,
            disablePadding: false,
            label: 'UnitOfMeasure',
          },{
            id: 'Location',
            numeric: true,
            disablePadding: false,
            label: 'Location',
          },{
            id: 'ServiceName',
            numeric: true,
            disablePadding: false,
            label: 'ServiceName',
          },
      ];
    return (
        <TableHead sx={{ backgroundColor: '#98FFF4' }}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
              sx={{fontWeight: 'bold', padding:'10px', height:'auto'}}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
  }
  

  export default CustomTableHead;