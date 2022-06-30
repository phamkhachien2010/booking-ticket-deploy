import React, { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';
import { quanLyRapService } from '../../../service/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../service/QuanLyDatVeService';
import { values } from 'lodash';
import { STATUS_CODE } from '../../../util/setting/config';
import { history } from '../../../App';


export default function ShowTime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async (values) => {
      try {
        let result = await quanLyDatVeService.taoLichChieu(values)
        if (result.status === STATUS_CODE.SUCCESS) {
          alert('Tạo lịch chiếu thành công')
          history.push('/admin/films')
        }
      } catch (error) {
        alert(error.response?.data.content)
        console.log('error', error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap('');

      setState({
        ...state,
        heThongRapChieu: result.data.content
      })

    } catch (error) {
      console.log('error', error.response?.data);
    }

    return () => {

    }
  }, [])


  const handleChangeTaoMoiHeThongRap = async (values) => {
    try {
      let result = await quanLyRapService.layThongTinCumRapTheoHeThong(values)
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (error) {
      console.log('error', error.response?.data);
    }

  }

  const handleChangeCumRap = (values) => {
    formik.setFieldValue('maRap', values)
  }

  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))

  }

  const handleChangeNgayChieuGioChieu = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  }

  const handleChangeGiaVe = (values) => {
    formik.setFieldValue('giaVe', values)
  }

  let film = {}
  if (localStorage.getItem('filmParam')) {
    film = JSON.parse(localStorage.getItem('filmParam'))
  }


  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <h3>Tạo Lịch Chiếu - {props.match.params.tenPhim}</h3>
      <img src={film.hinhAnh} style={{ width: '100px' }} alt="" />
      <Form.Item label="Tạo mới hệ thống rạp">
        <Select
          onChange={handleChangeTaoMoiHeThongRap}
          placeholder='Chọn hệ thống rạp'
          options={state.heThongRapChieu?.map((heThongRap, index) => ({
            value: heThongRap.maHeThongRap,
            label: heThongRap.tenHeThongRap,
          }
          ))}
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          onChange={handleChangeCumRap}
          placeholder='Chọn cụm rạp'
          options={state.cumRapChieu?.map((cumRap, index) => ({
            value: cumRap.maCumRap,
            label: cumRap.tenCumRap,
          }))}
        />
      </Form.Item>

      <Form.Item label="Ngày chiếu, giờ chiếu">
        <DatePicker format='DD/MM/YYYY hh:mm:ss' placeholder='Chọn ngày, giờ chiếu' onOk={onOk} onChange={handleChangeNgayChieuGioChieu} showTime />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber placeholder='Giá vé' min='75000' max='150000' onChange={handleChangeGiaVe} />
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type="primary" htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
    </Form>
  )
}
