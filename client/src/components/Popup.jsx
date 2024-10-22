import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    z-index: 999;
`;

const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
    margin-bottom: 20px;
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => (props.cancel ? 'gray' : 'black')};
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.cancel ? 'darkgray' : '#333')};
    }
`;

const Modal = ({ handleCancelDelete, handleConfirmDelete, message}) => {
    return (
        <ModalContainer>
            <ModalContent>
                <ModalTitle>Are you sure?</ModalTitle>
                <p>{message}</p>
                <ModalActions>
                    <ModalButton onClick={handleConfirmDelete}>Yes</ModalButton>
                    <ModalButton cancel onClick={handleCancelDelete}>No</ModalButton>
                </ModalActions>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;
