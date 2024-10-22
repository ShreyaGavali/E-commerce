import React,{useEffect, useState} from 'react';
import './productList.css';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../../redux/apiCalls';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
      getProducts(dispatch);
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProducts(id, dispatch)
    }
    const validProducts = products.filter(product => product._id);
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 200, renderCell: (params)=>{
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.title}
            </div>
          )
        } },
        { field: 'inStock', headerName: 'Stock', width: 200 },
        {
          field: 'price',
          headerName: 'Price',
          width: 160,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 150,
          renderCell: (param) => {
            return(
              <>
                <Link to={"/product/"+param.row._id}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <i className="fa-solid fa-trash ProductListDelete" onClick={()=>handleDelete(param.row._id)}></i>
              </>
            )
          }
        }
      ];
      const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className="productList">
        <DataGrid
        rows={validProducts}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  )
}

export default ProductList