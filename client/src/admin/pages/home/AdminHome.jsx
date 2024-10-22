import React, { useEffect, useState, useMemo } from 'react';
import './home.css'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import WidgetSm from '../../components/widgetSm/widgetSm';
import WidgetLg from '../../components/widgetLg/widgetLg';
import { userRequest } from '../../../requestMethod';

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);

  useEffect(() => {
    const getStats = async () => {
      try{
        const res = await userRequest.get("/user/stats")
        res.data.map((item) => {
          setUserStats((prev) =>[
            ...prev,
            {name:MONTHS[item._id - 1], "Active User": item.total}
          ])
        })
      }catch{}
    }
    getStats();
  },[MONTHS])

  return (
    <div className='home'>
        <FeaturedInfo />
        <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
        <div className='homeWidgets'>
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  )
}

export default AdminHome