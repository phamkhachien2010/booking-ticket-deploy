import React from 'react'
import './Film_Flip.css'
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Film_Flip(props) {

    const { film } = props

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div>
                        <img src={film.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                    </div>

                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <img src={film.hinhAnh} alt="" style={{ width: 300, height: 300 }} />
                    </div>
                    <div className='w-full h-full' style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className='rounded-full cursor-pointer'><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className='text-2xl mt-2 font-bold'>{film.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center cursor-pointer bg-indigo-300 my-2 text-green-50 font-bold rounded-md'>
                <NavLink to={`/detail/${film.maPhim}`} className='text-white w-full block h-full py-2' >Đặt vé</NavLink>
            </div>

        </div>

    )
}
