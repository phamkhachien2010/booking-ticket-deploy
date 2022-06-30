import { Button, Form, Input, Select } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { themNguoiDung } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../service/QuanLyNguoiDungService';
import { GROUPID, STATUS_CODE } from '../../../../util/setting/config';

const { Option } = Select;

export default function ThemNguoiDung() {

    const [state, setState] = useState({
        loaiNguoiDung: []
    })
    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            if (result.status === STATUS_CODE.SUCCESS) {
                setState({
                    loaiNguoiDung: result.data.content
                })
            }
        } catch (error) {

        }

        return () => {

        }
    }, [])


    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUPID,
            maLoaiNguoiDung: '',
            hoTen: ''
        },
        onSubmit: (values) => {
            dispatch(themNguoiDung(values))
        }
    })

    const handleChangeMaLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    return (
        <div className='container'>
            <h3 className='text-xl'>Thêm người dùng</h3>
            <Form className="grid grid-cols-2" onSubmitCapture={formik.handleSubmit}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="Tài khoản">
                        <Input name='taiKhoan' value={formik.values.taiKhoan} onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" rules={[{ required: true, message: 'Nhập mật khẩu của bạn!' }]}>
                        <Input.Password name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Họ tên" rules={[{ required: true, message: 'Nhập họ tên của bạn!' }]} >
                        <Input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
                    </Form.Item>

                    <NavLink to='/admin' className='ml-52'><i className="fa fa-angle-double-left"></i> Quay về</NavLink>
                </Form>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="email" rules={[{ required: true, message: 'Nhập email của bạn!' }]}>
                        <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại của bạn!' }]} >
                        <Input name='soDt' value={formik.values.soDt} onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Loại người dùng">
                        <Select defaultValue='Chọn loại người dùng' name='maLoaiNguoiDung' onChange={handleChangeMaLoaiNguoiDung}>
                            {state.loaiNguoiDung?.map((item, index)=>{
                                return <Option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>
                            })}
                        </Select>
                    </Form.Item>


                    <Form.Item className='text-right'>
                        <Button type="primary" htmlType="submit">
                            Thêm người dùng
                        </Button>
                    </Form.Item>
                </Form>
            </Form>
        </div>
    )
}
