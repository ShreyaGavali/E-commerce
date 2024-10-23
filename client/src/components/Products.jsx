import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { publicRequest } from '../requestMethod';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filterProducts,setFilterProducts] = useState([]);

  console.log(cat);

  useEffect(() => {
    const getProducts = async () => {
      try{
        console.log("Fetching products from: ", `api/product?category=${cat}` );
        const res = await publicRequest.get( cat ? `/product?category=${cat}` : "/product/" );
        console.log(res.data);
        setProducts(res.data);
      }catch(err){ }
    };
    getProducts()
  },[cat]);

  useEffect(() => {
    cat && 
      setFilterProducts(
        products.filter((item) => 
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters])

  useEffect(() => {
    if((sort === "newest")){
      setFilterProducts((prev) => 
      [...prev].sort((a,b) => a.createdAt - b.createdAt)
      )
    }else if(sort === "asc"){
      setFilterProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      )
    }else{
      setFilterProducts((prev) => 
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <Container>
      {cat ? Array.isArray(filterProducts) && filterProducts.map(item => (
        <Product item={item} key={item.id} />
      )) : Array.isArray(filterProducts) && products.slice(0, 8).map(item => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Products