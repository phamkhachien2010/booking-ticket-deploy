import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { layThongTinTaiKhoan } from '../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../service/QuanLyNguoiDungService';
import { STATUS_CODE } from '../../util/setting/config';
import _ from 'lodash';
import moment from 'moment';
import { history } from '../../App';

const { TabPane } = Tabs;

export default function Profile() {

  const { thongTinTaiKhoan, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const dispatch = useDispatch()
  // console.log({ thongTinTaiKhoan });
  // console.log({userLogin});

  useEffect(() => {

    dispatch(layThongTinTaiKhoan())
    return () => {

    }
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: thongTinTaiKhoan.email,
      hoTen: thongTinTaiKhoan.hoTen,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      maNhom: thongTinTaiKhoan.maNhom,
      matKhau: thongTinTaiKhoan.matKhau,
      soDt: thongTinTaiKhoan.soDT,
      taiKhoan: thongTinTaiKhoan.taiKhoan,
      thongTinDatVe: thongTinTaiKhoan.thongTinDatVe
    },
    onSubmit: async values => {
      try {
        let result = await quanLyNguoiDungService.tuThayDoiThongTinNguoiDung(values)
        if (result.status === STATUS_CODE.SUCCESS) {
          alert('Cập nhật thông tin thành công');
          history.push('/')
        }

      } catch (error) {
        console.log('error', error.response?.data);
        alert(error.response?.data.content)
      }
    },
  });

  return (
    <div style={{ background: 'url(https://cohet.vn/upload/data/images/BACKGROUND-%202-TECK/199-background-dep-cho-may-tinh/hinh-nen-chang-dung-si-tren-duong-di-tim-cong-chua_014743692.jpg)', backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', padding: '150px' }}>
      <div className="m-5 p-5 bg-white" style={{ minHeight: '350px' }}>
        <img src='https://picsum.photos/100' className='rounded-full m-auto' alt="avatar" />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin cá nhân" key="1">
            <Form className="grid grid-cols-2" onSubmitCapture={formik.handleSubmit}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
              >
                <Form.Item label="email" rules={[{ required: true, message: 'Nhập email của bạn!' }]}>
                  <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>

                <Form.Item label="Họ tên" rules={[{ required: true, message: 'Nhập họ tên của bạn!' }]} >
                  <Input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại của bạn!' }]} >
                  <Input name='soDt' value={formik.values.soDt} onChange={formik.handleChange} />
                </Form.Item>
              </Form>

              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
              >
                <Form.Item label="Tài khoản">
                  <Input disabled name='taiKhoan' value={formik.values.taiKhoan} />
                </Form.Item>

                <Form.Item label="Mật khẩu" rules={[{ required: true, message: 'Nhập mật khẩu của bạn!' }]}
                >
                  <Input.Password name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item className='text-right'>
                  <Button type="primary" htmlType="submit">
                    Cập nhật thông tin
                  </Button>
                </Form.Item>
              </Form>
            </Form>
          </TabPane>

          <TabPane tab="Lịch sử đặt vé" key="2">
            <div className="flex flex-wrap -m-4">
              {thongTinTaiKhoan.thongTinDatVe?.map((taiKhoan, index) => {
                return <div className="p-4 lg:w-1/2" key={index}>
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img src={taiKhoan.hinhAnh} className='w-32' alt="" />
                    <div className="flex-grow sm:pl-8 text-left">
                      <h2 className="title-font font-medium text-lg text-gray-900">{taiKhoan.tenPhim}</h2>
                      <h3 className="text-gray-500 mb-3">Thời lượng phim: {taiKhoan.thoiLuongPhim} phút</h3>
                      <h3 className="text-gray-500 mb-3">Giá vé: {taiKhoan.giaVe.toLocaleString()} đ</h3>

                      <h3 className="text-gray-500 mb-3">Ghế: {_.sortBy(taiKhoan.danhSachGhe, ['tenGhe']).map((ghe, index) => {
                        return <span key={index}>{ghe.tenGhe} </span>
                      })}</h3>
                      <h3 className="text-gray-500 mb-3">Tổng tiền: {(_.size(taiKhoan.danhSachGhe) * taiKhoan.giaVe).toLocaleString()} đ</h3>
                      <h3 className="text-gray-500 mb-3">Địa điểm: {_.first(taiKhoan.danhSachGhe).tenHeThongRap} - {_.first(taiKhoan.danhSachGhe).tenCumRap}</h3>
                      <h3 className="text-gray-500 mb-3">Thời gian đặt: {moment(taiKhoan.ngayDat).format('hh:mm - DD/MM/YY')}</h3>
                      <span className="inline-flex">

                      </span>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
