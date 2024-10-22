import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/apiCalls';
import { useNavigate, Link } from 'react-router-dom';
import { resetRegistration } from '../redux/userRedux';
import { ClipLoader } from 'react-spinners'; 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  ${mobile({width: "75%"})}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)}; /* Add some transparency when disabled */
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')}; /* Show not-allowed cursor */
  
  &:disabled {
    background-color: gray; /* Change background color when disabled */
  }
`;

const Error = styled.p`
  color: red;
`;

const Success = styled.p`
  color: green;
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1000;
  opacity: 0.9;
`;

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { isFetching, error, registrationSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(resetRegistration());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !email || !password || !confirmPassword) {
      setFormError('All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }
    setFormError('');
    registerUser(dispatch, { userName, email, password });
  };
  // useEffect(() => {
  //   if (registrationSuccess) {
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //       navigate('/login');
  //     }, 3000); // Hide popup after 3 seconds and navigate to login
  //   }
  // }, [registrationSuccess, navigate]);

  useEffect(() => {
    if (registrationSuccess) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
        dispatch(resetRegistration());  // Reset after navigating to login
      }, 3000); // Hide popup after 3 seconds and navigate to login
    }
  }, [registrationSuccess, navigate, dispatch]);
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>.
          </Agreement>
          <Button type="submit" disabled={isFetching}>
            CREATE
          </Button>
        </Form>
        <p>Already have any account ? <Link to={"/login"} className="link">Login</Link></p>
          {formError && <Error>{formError}</Error>}
          {error && <Error>{error}</Error>}
        </Wrapper>
        {showPopup && (
        <Popup>Registration successful! Please log in.</Popup>
      )}
    </Container>
  )
}

export default Register