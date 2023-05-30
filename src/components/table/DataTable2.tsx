import React, { useState , useEffect} from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import {DATA} from './models';

//Table using react-table

const DataTable = () => {
    const columns1 = [{
        Header: 'ConsumedQuantity',

    }, {
        Header: 'Cost'
    },
    {
        Header: 'Date'
    },
    {
        Header: 'InstanceId'
    },
    {
        Header: 'ResourceGroup'
    },
    {
        Header: 'ResourceLocation'
    },
    {
        Header: 'Tags',
        cloumns: [{
            Header: 'app-name',
            accessor: 'app-name'
        }, {
            Header: 'environment',
            accessor: 'environment'
        }, {
            Header: 'business-unit',
            accessor: 'business-unit'
        },
        ]
    },
    {
        Header: 'UnitOfMeasure'
    },
    {
        Header: 'Location'
    },
    {
        Header: 'ServiceName'
    },
    ]
    const[data,  setData] = useState<DATA>([]);
const sample = {
    ConsumedQuantity: "24",
    Cost: "21.5424",
    Date: "30/11/2020",
    InstanceId: "LA-f9c2ab0f-e037-4b5a-9fb9-3452e9c325b9",
    MeterCategory: "Logic Apps",
    ResourceGroup: "Macao",
    ResourceLocation: "EastUS",
    Tags: {
      'app-name': "Macao",
      environment: "Test",
      'business-unit': "SolutionOps"
    },
    UnitOfMeasure: "1 Hour",
    Location: "US East",
    ServiceName: "Logic Apps"
  }
  
    useEffect(()=> {
        const getData = async () => {
            const response = await fetch('https://engineering-task.elancoapps.com/api/raw');
            const data = await response.json();
            setData(data);
        }
        getData();
    },[])
    

    const columnHelper = createColumnHelper<DATA>();

    

    return (
       <div></div>
    )
}

export default DataTable

