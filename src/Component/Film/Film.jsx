import React from 'react'

export default function Film(props) {

    const { film } = props

    return (
        <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
            <div style={{ background: `url(${film.hinhAnh}) `, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <img className='opacity-0 w-full' style={{ height: '200px' }} src={film.hinhAnh} alt="" />
            </div>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 my-2" style={{height:'60px'}}>{film.tenPhim}</h1>
            {film.moTa.length > 100 ? <p className="leading-relaxed mb-3" style={{height:'120px'}} >{film.moTa.slice(0, 100)}...</p> : <p className="leading-relaxed mb-3" style={{height:'120px'}}>{film.moTa}</p>}
            <button className="text-indigo-500 inline-flex items-center">Đặt vé</button>

        </div>


    )
}
