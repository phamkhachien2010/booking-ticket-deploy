import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Select } from 'antd';
import { history } from '../../../../App';

//hook đa ngôn ngữ
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/setting/config';
import { Menu, Dropdown } from 'antd';
import { AndroidOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';


const { Option } = Select;

export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation()

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const renderAdminTag = () => {
        return userLogin.maLoaiNguoiDung === "QuanTri" ? <Menu.Item>
            <NavLink to='/admin' className='grid grid-cols-3 items-center text-lg'><AndroidOutlined /><span>admin</span></NavLink>
        </Menu.Item> : <Fragment></Fragment>
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
        {renderAdminTag()}

    </Menu >
    );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <div className="self-center border-2 ml-2 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900 h-full">
                    <NavLink to='login' className='text-white px-8 py-3 h-full block'>{t('login')}</NavLink>
                </div>
                <div className="self-center border-2 ml-2 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900 h-full">
                    <NavLink to='register' className='text-white px-8 py-3 h-full block'>{t('signUp')}</NavLink>
                </div>

            </Fragment>
        }
        return <Fragment>
            <div className="self-center ml-2 font-semibold dark:bg-violet-400 dark:text-coolGray-900">
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <div>
                        <Avatar size={45} icon={<UserOutlined />} />
                    </div>
                </Dropdown>
            </div>


        </Fragment>

    }

    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-60 bg-black text-white fixed w-full z-10">
            <div className="flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to='/home' aria-label="Back to homepage" className="flex items-center p-2 w-20 ml-5">
                    <img className='w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFXoDHKnKQ1O3KKYnVB4Bdbwp0N2OLmJvag&usqp=CAU" alt="logo" />
                </NavLink>

                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='/home' activeClassName='border-b-2' className="flex items-center px-4 -mb-1 text-white dark:text-violet-400 ">{t('home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='contact' activeClassName='border-b-2' className="flex items-center px-4 -mb-1 text-white">{t('contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to='news' activeClassName='border-b-2' className="flex items-center px-4 -mb-1 text-white">{t('news')}</NavLink>
                    </li>
                </ul>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <Select defaultValue="en" style={{ width: 70 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="fr">Fra</Option>
                        <Option value="chi">Chi</Option>
                        <Option value="vie">Vie</Option>
                    </Select>

                    {renderLogin()}


                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}
