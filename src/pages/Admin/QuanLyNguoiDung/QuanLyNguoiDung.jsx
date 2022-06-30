import React, { Fragment, useEffect } from 'react'
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung, xoaNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { SET_THONG_TIN_NGUOI_DUNG } from '../../../redux/Types/CarouselConst';

const { Search } = Input;

export default function QuanLyNguoiDung() {

    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachNguoiDung())

        return () => {

        }
    }, [])


    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            render: (text, record, index) => {
                return index + 1
            },
            width: 50
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let taiKhoan1 = a.taiKhoan;
                let taiKhoan2 = b.taiKhoan;
                if (taiKhoan1 > taiKhoan2) {
                    return 1
                }
                return -1
            },
            width: 250
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            width: 200
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let maLoaiNguoiDung1 = a.maLoaiNguoiDung.toLowerCase().trim();
                let maLoaiNguoiDung2 = b.maLoaiNguoiDung.toLowerCase().trim();
                if (maLoaiNguoiDung1 > maLoaiNguoiDung2) {
                    return 1
                }
                return -1
            },
            width: 200
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let hoTen1 = a.hoTen.toLowerCase().trim();
                let hoTen2 = b.hoTen.toLowerCase().trim();
                if (hoTen1 > hoTen2) {
                    return 1
                }
                return -1
            },
            width: 250
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            width: 200
        },

        {
            title: '',
            dataIndex: 'x',
            render: (text, nguoiDung, index) => {
                // console.log({ nguoiDung });
                return <Fragment >
                    <NavLink key='1' to={`/admin/quanLyUser/editUser/${nguoiDung.taiKhoan}`} onClick={()=>{
                        dispatch({
                            type: SET_THONG_TIN_NGUOI_DUNG,
                            nguoiDung
                        })
                    }} className='mr-2 text-xl text-black'><i className="fa fa-edit"></i></NavLink>
                    <span key='2' onClick={() => {
                        if (window.confirm('Bạn có muốn xoá tài khoản ' + nguoiDung.taiKhoan)) {
                            dispatch(xoaNguoiDung(nguoiDung.taiKhoan))
                        }
                    }} className='text-xl text-black cursor-pointer'><i className="fa fa-trash-alt"></i></span>

                </Fragment>
            },
        },

    ];


    const onSearch = (value) => {
        // console.log();
        dispatch(layDanhSachNguoiDung(value))
    }

    return (
        <div className='container'>
            <div className='flex justify-between mb-2'>
                <h3 className='text-xl'>Quản lý người dùng</h3>
                <div className='bg-green-500 flex items-center px-2'>
                    <NavLink to={`/admin/quanLyUser/editUser/addUser`} className='ml-2 text-xl text-black w-full h-full block hover:text-white'><i className="fa fa-plus"></i> Thêm người dùng</NavLink>
                </div>
            </div>

            <Search placeholder="Search here !" onSearch={onSearch} enterButton />
            <Table columns={columns} dataSource={danhSachNguoiDung} />
        </div>
    )
}
