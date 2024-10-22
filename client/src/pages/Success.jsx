import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // To get the logged-in user's ID
import { userRequest } from '../requestMethod'; // Import the request method to make API calls
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { mobile } from '../responsive';

// Styled Components
const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    min-height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const Subtitle = styled.p`
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
`;

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Order = styled.div`
    border: 1px solid lightgray;
    padding: 20px;
    border-radius: 10px;
`;

const OrderID = styled.p``;

const OrderDate = styled.p``;

const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Product = styled.div`
    display: flex;
    align-items: center;
`;

const ProductDetail = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
    ${mobile({ fontSize: "50%" })}
`;

const ProductQuantity = styled.span``;

const ProductPrice = styled.span``;

const TotalAmount = styled.h3`
    margin-top: 20px;
`;

const NoOrdersMessage = styled.p`
    text-align: center;
    font-size: 20px;
    color: teal;
`;


const Success = () => {
    const currentUser = useSelector((state) => state.user.currentUser); // Get logged-in user
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        // Fetch the order from backend when the component loads
        const fetchOrders = async () => {
            try {
                const res = await userRequest.get(`/order/${currentUser._id}`); // API call to get the user's orders
                setOrders(res.data); // Assuming the response is an array of orders
            } catch (err) {
                console.log(err);
            }
        };

        if (currentUser) {
            fetchOrders();
        } else {
            // If no user is logged in, redirect to login page
            navigate('/login');
        }
    }, [currentUser, navigate]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                {orders.length > 0 ? (
                    <>
                        <Title>Order Success!</Title>
                        <Subtitle>Your order has been placed successfully. Below are the details of your order:</Subtitle>
                        <OrderContainer>
                            {orders.map((order) => (
                                <Order key={order._id}>
                                    <OrderID><b>Order ID:</b> {order._id}</OrderID>
                                    <OrderDate><b>Order Date:</b> {new Date(order.createdAt).toLocaleDateString()}</OrderDate>
                                    <ProductList>
                                        {order.products.map((product) => (
                                            <Product key={product._id}>
                                                <ProductDetail>
                                                    <Image src={product.image} />
                                                    <Details>
                                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                                        <ProductId><b>ID:</b> {product._id}</ProductId>
                                                        <ProductQuantity><b>Quantity:</b> {product.quantity}</ProductQuantity>
                                                        <ProductPrice><b>Price:</b> &#8377; {product.price * product.quantity}</ProductPrice>
                                                    </Details>
                                                </ProductDetail>
                                            </Product>
                                        ))}
                                    </ProductList>
                                    <TotalAmount><b>Total Amount:</b> &#8377; {order.amount / 100}</TotalAmount>
                                </Order>
                            ))}
                        </OrderContainer>
                    </>
                ) : (
                    <NoOrdersMessage>You don't have any orders yet. Please explore our products!</NoOrdersMessage>
                )}
            </Wrapper>
            <Footer />
        </Container>

    );
};

export default Success;

