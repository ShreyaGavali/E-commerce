import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive'

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column"})};
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Logo = styled.h1``
const Desc = styled.p`
  margin: 20px 0px;
`
const SocialContainer  = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color}
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // margin-right: 20px;
`

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display: "none"})}

`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-botton: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor: "#fff8f8"})}
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>TIRO.</Logo>
            <Desc>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, sed. Aut voluptatem error, provident iure porro deleniti quisquam dignissimos corporis doloremque rem! Nisi
            </Desc>
            <SocialContainer>
                <SocialIcon style={{display: "flex", alignItems:"center", justifyContent: "center", marginRight: "20px"}}  color="385999">
                  <i className="fa-brands fa-facebook"></i>
                </SocialIcon>
                <SocialIcon style={{display: "flex", alignItems:"center", justifyContent: "center", marginRight: "20px"}} color="E4405F">
                  <i className="fa-brands fa-instagram"></i>
                </SocialIcon>
                <SocialIcon style={{display: "flex", alignItems:"center", justifyContent: "center", marginRight: "20px"}} color="000000">
                  <i className="fa-brands fa-x-twitter"></i>
                </SocialIcon>
                <SocialIcon style={{display: "flex", alignItems:"center", justifyContent: "center", marginRight: "20px"}} color="E60023">
                  <i className="fa-brands fa-pinterest"></i>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact Us</Title>
            <ContactItem>
              <i style={{marginRight: "10px"}} className="fa-solid fa-location-dot"></i>
              Nashik Road, Nashik - 422101
            </ContactItem>
            <ContactItem>
              <i style={{marginRight: "10px"}} className="fa-solid fa-phone"></i>
              +91 9834631958
            </ContactItem>
            <ContactItem>
              <i style={{marginRight: "10px"}} className="fa-regular fa-envelope"></i>
              contact@tiro.dev
            </ContactItem>
        </Right>
    </Container>
  )
}

export default Footer