import React, {useState} from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../redux/userRedux';
import Popup from '../components/Popup';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    margin: 0;
    padding: 0;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: "2", justifyContent: "center" })}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const CartIconContainer = styled.div`
    position: relative;
    cursor: pointer;
`

const Badge = styled.div`
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: teal;
    color: white;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const currentUser = useSelector(state => state.user.currentUser); // Get logged-in user
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    // const handleLogout = () => {
    //     dispatch(logoutSuccess()); // Dispatch the logout action
    // }

    const handleLogoutClick = () => {
        setPopupMessage("Do you really want to log out?");
        setShowModal(true); // Show the confirmation modal
    };

    const handleConfirmLogout = () => {
        dispatch(logoutSuccess());
        navigate("/"); // Navigate to the home page after logout
        setShowModal(false); // Close the modal
    };

    const handleCancelLogout = () => {
        setShowModal(false); // Close the modal without logging out
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <i style={{ color: "gray", fontSize: '16px' }} className="fa-solid fa-magnifying-glass"></i>
                    </SearchContainer>
                </Left>
                <Center><Link to={'/'} className="link"><Logo>TIRO.</Logo></Link></Center>
                <Right>
                    {currentUser ? (
                        <>
                            <MenuItem onClick={handleLogoutClick}>LOGOUT</MenuItem>
                            <Link className="link" to="/order"><MenuItem>ORDERS</MenuItem></Link>
                            <Link className="link" to={`/cart/${currentUser._id}`}>
                                <MenuItem>
                                    <CartIconContainer>
                                        <i className="fa-lg fa-solid fa-cart-shopping"></i>
                                    </CartIconContainer>
                                </MenuItem>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="link" to={'/register'}><MenuItem>REGISTER</MenuItem></Link>
                            <Link className="link" to={'/login'}><MenuItem>SIGN IN</MenuItem></Link>
                        </>
                    )}
                </Right>
            </Wrapper>
            {showModal && (
                <Popup
                    handleCancelDelete={handleCancelLogout} // Cancel logout
                    handleConfirmDelete={handleConfirmLogout} // Confirm logout
                    message={popupMessage}
                />
            )}
        </Container>
    )
}

export default Navbar
