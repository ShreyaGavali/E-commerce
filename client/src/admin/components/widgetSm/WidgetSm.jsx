import React,{useState, useEffect} from 'react';
import './widgetSm.css';
import { userRequest } from '../../../requestMethod';

const WidgetSm = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const getUsers = async () => {
            try{
                const res = await userRequest.get("/user/?new=true")
                setUsers(res.data)
            }catch{} 
        };
        getUsers()
    },[])
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
                <img src={user.img || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.userName}</span>
                </div>
                <button className="widgetSmButton">
                    <i className="fa-solid fa-eye"></i>
                    Display
                </button>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default WidgetSm