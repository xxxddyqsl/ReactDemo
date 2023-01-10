import React, { useState } from 'react';
import NewSreps from './03-antd-UI组件库-Steps步骤条'
import NewDropdown from './04-antd-UI组件库-下拉框'
import NewCarousel from './05-antd-UI组件库-轮播'
import NewTable from './06-antd-UI组件库-表格'
import NewTree from './07-antd-UI组件库-树'
import NewModal from './08-antd-UI组件库-对话框'
// antd icon 图标库
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,

} from '@ant-design/icons';
// antd-UI组件库  下拉菜单 ( Dropdown, Space)
import { Layout, Menu, theme, } from 'antd';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
const { Header, Sider, Content } = Layout;

export default function Test() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='app-assembly'>
            <h1>02-antd-PC端-UI组件库-Layout布局</h1>
            <div>
                <Layout>
                    {/* 左侧菜单栏 collapsed 折叠取反 展开收起 */}
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: 'nav 1',
                                },
                                {
                                    key: '2',
                                    icon: <VideoCameraOutlined />,
                                    label: 'nav 2',
                                },
                                {
                                    key: '3',
                                    icon: <UploadOutlined />,
                                    label: 'nav 3',
                                },
                            ]} />
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                            }}  >
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                overflow: 'auto',
                                background: colorBgContainer,
                            }} >

                            <div className='gg-flex-3'>
                                <div>Dropdown -下拉菜单组件 -- </div>
                                <NewDropdown />
                            </div>
                            <div>
                                <div>Steps-步骤条组件  -- </div>
                                <NewSreps></NewSreps>
                            </div>
                            <div>
                                <div>Carousel-轮播组件  -- </div>
                                <NewCarousel></NewCarousel>
                            </div>
                            <div>
                                <div>Table-表格组件  -- </div>
                                <NewTable></NewTable>
                            </div>
                            <div>
                                <div>Tree-树组件  -- </div>
                                <NewTree></NewTree>
                            </div>
                            <div>
                                <div>Modal-对话框 组件  -- </div>
                                <NewModal></NewModal>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}
