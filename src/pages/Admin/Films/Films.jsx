import React, { Fragment, useEffect } from 'react'
import { Table } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanlyFilmAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;

export default function Films() {

    const { arrFilmDefault } = useSelector(state => state.QuanLyFilmReducer);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(layDanhSachPhimAction())

        return () => {

        }
    }, [])


    const onSearch = value => {
        dispatch(layDanhSachPhimAction(value))
    };

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            defaultSortOrder: 'descend',
            width: 200
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1
                }
                return -1
            },
            width: 300
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <img src={film.hinhAnh} style={{ width: '50px' }} alt="" />
            },
            width: 100
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            defaultSortOrder: 'descend',
            render: (mota) => {
                if (mota.length > 300) {
                    return mota.substr(0, 300) + ' ...'
                }
                return mota
            },
            width: 500
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (text, film) => {
                return <Fragment >
                    <NavLink key='1' to={`/admin/films/edit/${film.maPhim}`} className='mr-2 text-xl text-black'><i className="fa fa-edit"></i></NavLink>
                    <span key='2' onClick={() => {
                        if (window.confirm('Bạn có muốn xoá phim' + film.tenPhim)) {
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }} className='text-xl text-black cursor-pointer'><i className="fa fa-trash-alt"></i></span>
                    <NavLink key='3' to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        localStorage.setItem('filmParam', JSON.stringify(film))
                    }} className='ml-2 text-xl text-black'><i className="fa fa-calendar-alt"></i></NavLink>
                </Fragment>
            },
            width: 100
        },
    ];


    return (
        <div className='container'>
            <h3>Quản lý phim</h3>
            <button className='btn btn-primary mb-2' onClick={() => {
                history.push('/admin/films/addnew')
            }}>Thêm phim</button>
            <Search className='mb-5' placeholder="input search text" onSearch={onSearch} enterButton />
            <Table columns={columns} dataSource={arrFilmDefault} rowKey={'maPhim'} />
        </div>
    )
}
