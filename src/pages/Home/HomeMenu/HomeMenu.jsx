import React, { Fragment, useState } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;



export default function HomeMenu(props) {

    const [state, setState] = useState({ tabPosition: 'left' })

    const { heThongRapChieu } = props

    const { tabPosition } = state;

    const renderHeThongRap = () => {
        return heThongRapChieu?.map((item, index) => {
            let { tabPosition } = state;
            return <TabPane tab={<img src={item.logo} alt='logo' className='rounded-full' style={{ width: '50px' }} />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {item.lstCumRap?.slice(0, 5).map((cumrap, index) => {
                        return <TabPane tab={
                            <div style={{ width: '300px' }} className='flex justify-start items-center'>
                                <img src='https://picsum.photos/50/50' alt='logo' style={{ height: '100%' }} className='mr-3' />
                                <div>
                                    {cumrap.tenCumRap}
                                    <p className='text-red-500'>Chi Tiet</p>
                                </div>
                            </div>
                        } key={index}>
                            {cumrap.danhSachPhim.slice(0, 5).map((film, index) => {
                                return <Fragment>
                                    <div className='flex my-3' key={index}>
                                        <div className='flex items-center'>
                                            <img style={{ width: 50, height: 50 }} src={film.hinhAnh} alt="" onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/50/50' }} />
                                            <div className='ml-3'>
                                                <div className='text-lg font-bold'>{film.tenPhim}</div>
                                                <div>{cumrap.diaChi}</div>
                                                <div className='grid grid-cols-6 gap-x-4'>
                                                    {film.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink className='text-black' to={`/checkOut/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>

                                            </div>

                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    return (
        <>
            <Tabs tabPosition={tabPosition}>

                {renderHeThongRap()}
            </Tabs>
        </>
    )
}
