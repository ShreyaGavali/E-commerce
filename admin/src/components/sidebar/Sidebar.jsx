import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <i className="fa-sm fa-solid fa-house sidebarIcon"></i>
                                Home
                            </li>
                        </Link>
                        <Link to="/newProduct" className="link">
                        <li className="sidebarListItem">
                            <i className="fa-sm fa-solid fa-bars-staggered sidebarIcon"></i>
                            Create Product
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <i className="fa-sm fa-solid fa-arrow-trend-up sidebarIcon"></i>
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menue</h3>
                    <ul className="sidebarList">
                        <Link to='/users' className="link">
                        <li className="sidebarListItem">
                            <i className="fa-regular fa-user sidebarIcon"></i>
                            Users
                        </li>
                        </Link>
                        <Link to={"/products"} className="link">
                        <li className="sidebarListItem">
                            <i className="fa-solid fa-box sidebarIcon"></i>
                            Products
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <i className="fa-solid fa-indian-rupee-sign sidebarIcon"></i>
                            Transactions
                        </li>
                        <li className="sidebarListItem">
                            <i className="fa-solid fa-chart-simple sidebarIcon"></i>
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <i class="fa-regular fa-envelope sidebarIcon"></i>
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <i class="fa-regular fa-comments sidebarIcon"></i>
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <i class="fa-regular fa-message sidebarIcon"></i>
                            Message
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <i class="fa-solid fa-briefcase sidebarIcon"></i>
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <i className="fa-sm fa-solid fa-bars-staggered sidebarIcon"></i>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <i class="fa-solid fa-circle-info sidebarIcon"></i>
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar