import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { publicRequest, userRequest } from '../../../requestMethod';
import { updateProducts } from '../../redux/apiCalls';

const AdminProduct = () => {
    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [pStats, setPStats] = useState([])
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    // const product = useSelector(state => state.product.products.find(product => product._id === productId))

    const MONTHS = useMemo(() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],[]);

    useEffect(() => {
        const getStats = async () => {
            try{
                const res = await userRequest.get("order/income?pid"+ productId);
                const list = res.data.sort((a,b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total},
                    ])
                );
            } catch (err){
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS])

    useEffect(() => {
        const getProducts = async () => {
            try{
                const res = await publicRequest.get(`product/${productId}`);
                setProduct(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getProducts();
    },[productId]);

    const handleChange = (e) => {
        setUpdatedProduct(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // Handle form submission and dispatch the update action
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedProduct, productId);
        updateProducts(productId, updatedProduct, dispatch);
    };
    
  return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to={'/newProduct'}>
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Sales</span>
                        <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" name="title" placeholder={product.title} onChange={handleChange} />
                        <label>Product Description</label>
                        <input type="text" name="desc" placeholder={product.desc} onChange={handleChange} />
                        <label>Price</label>
                        <input type="text" name="price" placeholder={product.price} onChange={handleChange} />
                        <label>Size</label>
                        <input type="text" name="size" placeholder={product.size} onChange={handleChange} />
                        <label>Colour</label>
                        <input type="text" name="color" placeholder={product.color} onChange={handleChange} />
                        <label>Product Category</label>
                        <input type="text" name="categories" placeholder={product.categories} onChange={handleChange} />
                        <label>In Stock</label>
                        <select name="inStock" id="inStock" onChange={handleChange}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <i className="fa-solid fa-upload"></i>
                            </label>
                            <input type="file" id="file" style={{display: "none"}} />
                        </div>
                        <button className="productButton" type="submit">Update</button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default AdminProduct