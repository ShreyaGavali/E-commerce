import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess, resetLogin } from '../redux/userRedux';

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
  width: 25%;
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
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
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

const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const {isFetching, error, loginSuccess} = useSelector((state) => state.user);
  const navigate = useNavigate();

  
  const handleClick = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setFormError('All fields are required!');
      return;
    }
    setFormError('');
    await login(dispatch,{userName: username, password});
  }
  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);
  useEffect(() => {
    dispatch(resetLogin());
}, [dispatch]);

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                {formError && <Error>{formError}</Error>}
                {error && <Error>{error}</Error>}
                <p>Don't have any account ? <Link to={"/register"} className="link">Register</Link></p>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;