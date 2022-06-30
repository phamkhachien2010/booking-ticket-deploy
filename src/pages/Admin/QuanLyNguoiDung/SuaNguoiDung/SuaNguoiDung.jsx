import { Button, Form, Input, Select } from 'antd'
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { DisplayLoadingAction, HideLoadingAction } from '../../../../redux/actions/LoadingAction';
import { quanLyNguoiDungService } from '../../../../service/QuanLyNguoiDungService';
import { GROUPID, STATUS_CODE } from '../../../../util/setting/config';
const { Option } = Select;

export default function SuaNguoiDung(props) {

    const { nguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: nguoiDung.taiKhoan,
            matKhau: nguoiDung.matKhau,
            email: nguoiDung.email,
            soDt: nguoiDung.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: nguoiDung.maLoaiNguoiDung,
            hoTen: nguoiDung.hoTen
        },
        onSubmit: async (values) => {
            try {
                dispatch(DisplayLoadingAction)
                const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(values);
                if (result.status === STATUS_CODE.SUCCESS) {
                    alert('Cập nhật thông tin thành công');

                }
                history.push('/admin')
                dispatch(HideLoadingAction)
            } catch (error) {
                alert(error.response?.data.content)
            }

        }
    })

    const handleChangeMaLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    return (
        <div className='container'>
            <h3 className='text-xl'>Chỉnh sửa người dùng</h3>
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
                        <Select value={formik.values.maLoaiNguoiDung} name='maLoaiNguoiDung' onChange={handleChangeMaLoaiNguoiDung}>
                            <Option value='KhachHang'>Khách hàng</Option>
                            <Option value='QuanTri'>Quản trị</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item className='text-right'>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Form>
        </div>
    )
}
