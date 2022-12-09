import { Typography } from '@mui/material';
import React, { Component, useState, useEffect, useRef } from 'react';
import MUIDataTable from "mui-datatables";

function CustomDataTable(props){
    return <MUIDataTable
                title={props.title}
                data={props.data}
                columns={props.columns}
                options={props.options}
                components={{
                }}
            />
}

export default CustomDataTable;