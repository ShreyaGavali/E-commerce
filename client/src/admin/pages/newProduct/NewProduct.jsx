import React, { useState } from 'react';
import './newProduct.css';
import { addProducts } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const NewProduct = () => {
    const [inputs, setInputs] = useState({})
    const [img, setImg] = useState(null)
    const [cat, setCat] = useState([])
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }
    const handleSize = (e) => {
        setSize(e.target.value.split(","))
    }
    const handleColor = (e) => {
        setColor(e.target.value.split(","))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', img); // Append the file
        formData.append('title', inputs.title);
        formData.append('desc', inputs.desc);
        formData.append('price', inputs.price);
        // formData.append('categories', cat);
        // formData.append('size', size);
        // formData.append('color', color);
        cat.forEach((category) => formData.append('categories', category));
        size.forEach((s) => formData.append('size', s)); // Append each size separately
        color.forEach((c) => formData.append('color', c));
        formData.append('inStock', inputs.inStock === "true");
        // formData.append('inStock', inputs.inStock);
    
        try {
            await addProducts(formData, dispatch); // Send formData instead of JSON
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div className="newProduct">
        <h1 className="newProductTitle">New Product</h1>
        <form className="newProductForm">
            <div className="newProductItem">
                <label>Image</label>
                <input type="file" id="img" onChange={e => setImg(e.target.files[0])} />
            </div>
            <div className="newProductItem">
                <label>Title</label>
                <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
            </div>
            <div className="newProductItem">
                <label>Description</label>
                <input name="desc" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="newProductItem">
                <label>Price</label>
                <input name="price" type="number" placeholder="1000" onChange={handleChange} />
            </div>
            <div className="newProductItem">
                <label>Categories</label>
                <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
            </div>
            <div className="newProductItem">
                <label>Size</label>
                <input type="text" placeholder="S,M" onChange={handleSize} />
            </div>
            <div className="newProductItem">
                <label>Colour</label>
                <input type="text" placeholder="black,white,red" onChange={handleColor} />
            </div>
            <div className="newProductItem">
                <label>Stock</label>
                <select name="inStock" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </form>
        <button onClick={handleClick} className="newProductButton">Create</button>
    </div>
  )
}

export default NewProduct
