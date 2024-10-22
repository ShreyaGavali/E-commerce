import React, { useState, useEffect } from 'react';
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import { publicRequest } from '../../../requestMethod';


const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
        try{
            const res = await publicRequest.get('/user/');
            setData(res.data);
        }catch(err){
            console.log(err);
        }
    };
    getUsers();
},[]);

console.log(data);
  
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'userName', // Keep this as userName
      headerName: 'Username',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.userName} {/* Directly displaying userName */}
          </div>
        );
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
  
  return (
    <div className='userList'>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  )
}

export default UserList