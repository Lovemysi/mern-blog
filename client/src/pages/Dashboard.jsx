import React, { useEffect, useState } from "react";
import DashSidebar from "../conponents/DashSidebar";
import DashProfile from "../conponents/DashProfile";
import { useLocation } from "react-router-dom";

// 仪表盘用于 操作文章,设置用户
// 通过 url传递不同参数路由到不同仪表盘
// 先挂载的后渲染完成
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  // 渲染后的影响
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flow-row">
      <div className="md:w-56">
        {/**Sidebar */}
        <DashSidebar />
      </div>
      {/**profile */}
      {tab == "profile" && <DashProfile />}
    </div>
  );
}
