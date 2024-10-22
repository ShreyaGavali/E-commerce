import React, { useEffect, useState } from 'react';
import './featuredInfo.css';
import { userRequest } from '../../requestMethod';

const FeaturedInfo = () => {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
          try {
            const res = await userRequest.get("order/income");
            setIncome(res.data);
            setPerc((res.data[1].total * 100) / res.data[0].total - 100);
          } catch {}
        };
        getIncome();
      }, []);

  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">&#8377;{income[1]?.total}</span>
                <span className="featuredMoneyRate">
                    %{Math.floor(perc)}{" "} 
                    {perc < 0 ? (<i className="fa-solid fa-arrow-down featuredIcon negative"></i> ) : (<i className="fa-solid fa-arrow-up featuredIcon"></i>)}
                </span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">&#8377;4,113</span>
                <span className="featuredMoneyRate">
                    -1.4 <i className="fa-solid fa-arrow-down featuredIcon negative"></i>
                </span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Coast</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">&#8377;2,225</span>
                <span className="featuredMoneyRate">
                    +2.4 <i className="fa-solid fa-arrow-up featuredIcon"></i>
                </span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
    </div>
  )
}

export default FeaturedInfo