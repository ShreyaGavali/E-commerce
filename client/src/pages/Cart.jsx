import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
import { useNavigate } from 'react-router-dom';
import { deleteCart, deleteProductFromCart } from '../redux/apiCalls';
import { useParams } from 'react-router-dom';
import logo from '../assets/Tirologo.webp';
import Popup from '../components/Popup';
import axios from 'axios';

const KEY = import.meta.env.VITE_REACT_APP_STRIPE;
// console.log(KEY);

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    min-height: 100vh;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
    
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
    ${mobile({ width: "100px" })}
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.div`
    ${mobile({ fontSize: "50%" })}
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`
const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px; 
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const DeleteButton = styled.button`
    width: 50%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    margin-top: 10px;
    ${mobile({ width: "25%" })}
`

const NoCartMessage = styled.p`
    text-align: left;
    font-size: 20px;
    color: teal;
`;

const Cart = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const TOKEN = currentUser?.accessToken;
    // const cart = useSelector(state => state.cart);
    const [cartProducts, setCartProducts] = useState({ products: [] });
    const [totalAmount, setTotalAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");
    // const [loading, setLoading] = useState(true);
    // const user = useSelector((state) => state.user.currentUser);
    const { id } = useParams()

    const dispatch = useDispatch();
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
    }
    console.log(stripeToken);
    console.log(KEY);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await userRequest.get(`http://localhost:8080/api/cart/${id}`);
                setCartProducts(res.data); // Assuming the response contains a "products" array
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [id]);


    useEffect(() => {
        const calculateTotal = () => {
            if (cartProducts && cartProducts.products) {
                const total = cartProducts.products.reduce((sum, product) => {
                    return sum + product.price * product.quantity;
                }, 0);
                setTotalAmount(total); // Set the total amount in state
            }
        };

        calculateTotal();
    }, [cartProducts]);

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/order/", {
                    tokenId: stripeToken.id,
                    amount: totalAmount * 100, // Send the actual totalAmount
                    userId: currentUser._id, // Include the logged-in user's ID
                    address: stripeToken.card.address_line1, // Get the address from the Stripe token
                    products: cartProducts.products.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                        image: item.image, // Send product image
                        price: item.price // Send product price
                    })), // Include the products in the order
                });
    
                // Clear cart in backend
                console.log(currentUser._id);
                await deleteCart(currentUser._id, dispatch);
    
                // Clear cart in local state
                setCartProducts({ products: [] }); // Set an empty array for products in local state
    
                // Redirect user to the order summary page
                history("/order", { state: { stripeData: res.data, products: cartProducts.products } });
            } catch (err) {
                console.log(err);
            }
        };
        // Only make the request if we have a stripeToken and currentUser
        stripeToken && currentUser && makeRequest();
    }, [stripeToken, totalAmount, history, currentUser, cartProducts]);
    

    const handleDeleteProduct = (productId) => {
        setPopupMessage("Do you really want to remove product from cart?");
        setIsModalOpen(true); // Open the modal when the user clicks the delete button
        setSelectedProductId(productId);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(deleteProductFromCart(id, selectedProductId)); // Delete the selected product
            window.location.reload(); // Refresh the page after deletion
        } catch (err) {
            console.log(err);
        }
        setIsModalOpen(false); // Close the modal
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false); // Close the modal if the user cancels
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                {cartProducts && cartProducts.products && cartProducts.products.length > 0 ? (
                        <Info>
                            {cartProducts.products.map(product => (
                                <Product key={product._id}>
                                    <ProductDetail>

                                        <Image src={product.image} />
                                        <Details>
                                            <ProductName><b>Product:</b>{product.title}</ProductName>
                                            <ProductId><b>ID:</b>{product._id}</ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <i className="fa-solid fa-plus"></i>
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <i className="fa-solid fa-minus"></i>
                                        </ProductAmountContainer>
                                        <ProductPrice>&#8377; {product.price * product.quantity}</ProductPrice>
                                        <DeleteButton onClick={() => handleDeleteProduct(product._id)}>
                                            Remove
                                        </DeleteButton>
                                    </PriceDetail>
                                    {isModalOpen && (
                                        <Popup
                                            handleCancelDelete={handleCancelDelete}
                                            handleConfirmDelete={handleConfirmDelete}
                                            message={popupMessage}
                                        />
                                    )}
                                </Product>
                            ))}
                        </Info>
                    ) : (
                        <NoCartMessage>You don't have any products in the cart yet. Please explore our products!</NoCartMessage> // Display this message if no products in the cart
                    )}
                    {cartProducts && cartProducts.products && cartProducts.products.length  > 0 && (
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>&#8377; {totalAmount}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>&#8377; 5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>&#8377; -5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>&#8377;{totalAmount}</SummaryItemPrice>
                            </SummaryItem>
                            <StripeCheckout
                                name="TIRO."
                                image={logo}
                                billingAddress
                                shippingAddress
                                description={`Your total is ${totalAmount}`}
                                amount={totalAmount * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button>CHECKOUT NOW</Button>
                            </StripeCheckout>
                        </Summary>
                    )}
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart