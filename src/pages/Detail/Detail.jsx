import React, { useEffect, useState } from 'react'
import './Detail.css'
import './Circle.css'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanlyRapAction';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom'


const { TabPane } = Tabs;

export default function Detail(props) {

    const { phimDetail } = useSelector(state => state.QuanLyFilmReducer)
    const dispatch = useDispatch()


    useEffect(() => {

        const { id } = props.match.params

        dispatch(layThongTinLichChieuPhimAction(id))

        return () => {

        }
    }, [])


    const renderLichChieuPhim = (lichChieuPhim) => {
        return lichChieuPhim?.slice(0, 8).map((lichChieu, index) => {
            return <div key={index} className='bg-orange-300 mx-2 p-0.5'>
                <NavLink className='text-black' to={`/checkOut/${lichChieu.maLichChieu}`}>Giờ chiếu: {moment(lichChieu.ngayChieuGioChieu).format('hh.mm-DD/MM')} Tại: {lichChieu.tenRap}</NavLink>
            </div>
        })
    }

    const renderHeThongRapChieu = () => {
        return phimDetail.heThongRapChieu?.map((rap, index) => {
            return <TabPane tab={<div className='flex items-center'>
                <img style={{ width: '50px', marginRight: '10px' }} src={rap.logo} alt={rap.tenHeThongRap} />
                <div>{rap.tenHeThongRap}</div>
            </div>} key={index}>
                {rap.cumRapChieu?.map((cumRap, index) => {
                    return <div key={index}>
                        <div className='flex items-center'>
                            <img src={cumRap.hinhAnh} width='50' className='my-2' alt="" />
                            <div className='ml-3 text-left'>
                                <div className='text-xl'>
                                    {cumRap.tenCumRap}
                                </div>
                                <div>{cumRap.diaChi}</div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4'>
                            {renderLichChieuPhim(cumRap.lichChieuPhim)}
                        </div>
                    </div>
                })}
            </TabPane>
        })
    }


    return (
        <div className='detailFilm flex' style={{ backgroundImage: `url(${phimDetail.hinhAnh})` }}>
            <div className="box1 pt-28">
                <div className="flex items-center justify-evenly  gap-50">
                    <div className='flex items-center text-center w-1/3'>
                        <img src={phimDetail.hinhAnh} style={{ width: '250px' }} alt={phimDetail.tenPhim} />
                        <div className='ml-4 text-left'>
                            <p>Ngày chiếu: {moment(phimDetail.ngayKhoiChieu).format('DD.MM.YY')}</p>
                            <p className='text-xl font-bold text-black'>{phimDetail.tenPhim}</p>
                            {/* {phimDetail.moTa.length > 300 ? <p className='w-full'>{phimDetail.moTa.slice(0, 300)}</p> : <p>{phimDetail.moTa}</p>} */}
                            <p>{phimDetail.moTa}</p>
                        </div>
                    </div>
                    <div>
                        <div className={`c100 p${phimDetail.danhGia * 10} big`}>
                            <span>{phimDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>
                        <div>
                            <Rate value={phimDetail.danhGia / 2} />
                            <span className="ant-rate-text">{`${phimDetail.danhGia / 2} / ${phimDetail.danhGia / 2}`}</span>
                        </div>
                    </div>
                </div>

                <div className='bg-white container mt-3'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch Chiếu" key="1">
                            <div>
                                <Tabs tabPosition='left' className=''>
                                    {renderHeThongRapChieu()}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        </div>
    )
}
