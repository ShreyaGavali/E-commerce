import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethod';
import { useDispatch, useSelector } from "react-redux";
import { createCart } from '../redux/apiCalls';

const Container = styled.div`

`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`
const ImgContainer = styled.div`
  flex: 1;
`

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 200;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 500px;
  border-radius: 10px;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${(props) => (props.error ? '#FF4136' : '#4BB543')};
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id)
        setProduct(res.data);
        setImage(res.data.img);
        setPrice(res.data.price)
      } catch { }
    }
    getProduct()
  }, [id]);


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const handleClick = async () => {
    if (!color) {
      setError('Please select a color');
    } else if (!size) {
      setError('Please select a size');
    } else {
      setLoading(true); // Disable the button
      try {
        if (user) {
          await createCart(dispatch, { ...product, quantity, color, size, image, price }, user);
          setError(''); // Clear error if successful
          setPopupMessage('Product added to cart!'); // Set success message
          setIsError(false); // Set success state
        } else {
          // If user is not logged in
          setPopupMessage('Please login to add product to cart'); // Set error message
          setIsError(true); // Set error state
        }
      } catch (err) {
        setPopupMessage('Failed to add product'); // Handle error case
        setIsError(true);
      } finally {
        setLoading(false); // Re-enable the button after request is done
        setShowPopup(true); // Show popup

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    }
  };



  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        {showPopup && <Popup error={isError}>{popupMessage}</Popup>}
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>&#8377; {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color && product.color.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size && product.size.map((s) => (
                    <FilterSizeOption key={s} value={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <i className="fa-solid fa-minus" onClick={() => handleQuantity("dec")}></i>
              <Amount>{quantity}</Amount>
              <i className="fa-solid fa-plus" onClick={() => handleQuantity("inc")}></i>
            </AmountContainer>
            <Button onClick={handleClick}>
              {loading ? 'Adding...' : 'ADD TO CART'}
            </Button>
          </AddContainer>
          {error && <Error>{error}</Error>}
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Product