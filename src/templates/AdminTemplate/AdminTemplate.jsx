import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './AdminTemplate.css'

import { Avatar, Dropdown, Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    HomeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { TOKEN, USER_LOGIN } from '../../util/setting/config';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Sider, Content } = Layout;



export const AdminTemplate = (props) => {

    const [state, setState] = useState({
        collapsed: false
    })

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    }

    useEffect(() => {

        window.scrollTo(0, 0)

        return () => {

        }
    })

    if (!localStorage.getItem(USER_LOGIN) || userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert("Bạn không có quyền truy cập vào trang này !!!")
        return <Redirect to='/' />
    }

    const menu = (<Menu>
        < Menu.Item >
            <div className='grid grid-cols-4 grid-rows-3 grid-flow-col cursor-default'>
                <span className='text-black rounded-full px-3 py-2 bg-blue-500 row-span-2 flex justify-center items-center' style={{ width: '50px' }}><span className='text-black text-xl'>{_.first(userLogin?.hoTen)}</span></span>
                <span></span>
                <span className='col-span-3 ml-2 text-lg font-bold'>{userLogin.hoTen}</span>
                <span className='col-span-3 ml-2 text-lg'>{userLogin.taiKhoan}</span>
                <span className='col-span-3 ml-2 text-lg cursor-pointer text-blue-500'>
                    <NavLink to='/profile'>Quản lý tài khoản</NavLink>
                </span>
            </div>
        </ Menu.Item>
        <Menu.Item>
            <div className='grid grid-cols-3 items-center text-lg'
                onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/');
                    window.location.reload()
                }}><LogoutOutlined /><span>Đăng xuất</span></div>
        </Menu.Item>

    </Menu >
    );

    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        //propsRoute trả về props.location, props.history, props.match
        return <Fragment style={{ height: '100vh' }}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo">
                        <img src="https://picsum.photos/300/150" alt="" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to='/admin/quanLyUser'>User</NavLink>
                        </Menu.Item>

                        <SubMenu key='10' icon={<VideoCameraOutlined />} title='Films'>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <NavLink to='/admin/films'>Films</NavLink>

                            </Menu.Item>
                            <Menu.Item key='3' icon={<VideoCameraAddOutlined />}>
                                <NavLink to='/admin/films/addnew'>Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="4" icon={<HomeOutlined />}>
                            <NavLink to='/'>Home</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-between" style={{ padding: 0 }}>
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}

                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <div className='mr-5'>
                                <Avatar className='cursor-pointer' size={45} icon={<UserOutlined />} />
                            </div>
                        </Dropdown>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}