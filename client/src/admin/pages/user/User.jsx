import React, { useState, useEffect } from 'react';
import './user.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { userRequest } from '../../../requestMethod';

const User = () => {
    const id = useParams();
    const [data, setData] = useState({});
    console.log(id);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await userRequest.get(`/user/${id}`);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{data.userName}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <i className="fa-regular fa-user userShowIcon"></i>
                            <span className="userShowInfoTitle">{data.userName}</span>
                        </div>
                        <div className="userShowInfo">
                            <i className="fa-regular fa-calendar userShowIcon"></i>
                            <span className="userShowInfoTitle">31.12.2002</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <i className="fa-solid fa-mobile-screen-button userShowIcon"></i>
                            <span className="userShowInfoTitle">+91 9834631958</span>
                        </div>
                        <div className="userShowInfo">
                            <i className="fa-regular fa-envelope userShowIcon"></i>
                            <span className="userShowInfoTitle">shreyagavali2002@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <i className="fa-solid fa-location-dot userShowIcon"></i>
                            <span className="userShowInfoTitle">New York | USA</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder='ShreyaGavali' className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder='Shreya Gavali' className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder='shreyagavali2002@gmail.com' className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder='+91 9834631958' className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder='New York | USA' className="userUpdateInput" />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className="userUpdateImg" src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" />
                                <label htmlFor="file"><i className="fa-solid fa-upload userUpdateIcon"></i></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User