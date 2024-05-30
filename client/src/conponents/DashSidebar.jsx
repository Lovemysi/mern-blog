import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Link to="/dashboard?tab=profile"> */}
          <Sidebar.Item
            href="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          {/* </Link> */}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
