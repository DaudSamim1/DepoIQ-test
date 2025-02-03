import React, { useEffect, useState } from "react"
import { MessageOutlined, TagOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import Header from "./Header"
import Logo from "../components/layout/Logo"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ROUTES_ENDPOINTS } from "../contants/routes_endpoints"

const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  //  if window resizing width is less than 768px then collapse the sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    handleResize() // initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Layout className="h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="w-full p-3 flex justify-center">
          <Logo isCollapsed={collapsed} />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          items={[
            getItem("Topics", ROUTES_ENDPOINTS.DASHBOARD, <MessageOutlined />),
            getItem("Tags", ROUTES_ENDPOINTS.TAGS, <TagOutlined />)
          ]}
          onSelect={({ key }) => navigate(key as string)}
        />
      </Sider>
      <Layout>
        <Header />
        <Content className="my-4 mx-4">
          <div className="md:p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center bg-gray-200">
          DepoIQ Assesment ©{new Date().getFullYear()} Created by Daud Samim
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
