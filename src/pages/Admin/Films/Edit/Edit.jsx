import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Radio,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, layThongTinFilmAction } from '../../../../redux/actions/QuanlyFilmAction';
import { GROUPID } from '../../../../util/setting/config';


export default function Edit(props) {

    const [imgSrc, setImgSrc] = useState('')
    const { thongTinFilm } = useSelector(state => state.QuanLyFilmReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const maPhim = props.match.params.id

        dispatch(layThongTinFilmAction(maPhim))

        return () => {

        }
    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinFilm.maPhim,
            tenPhim: thongTinFilm?.tenPhim,
            trailer: thongTinFilm.trailer,
            moTa: thongTinFilm.moTa,
            ngayKhoiChieu: thongTinFilm.ngayKhoiChieu,
            dangChieu: thongTinFilm.dangChieu,
            sapChieu: thongTinFilm.sapChieu,
            hot: thongTinFilm.hot,
            danhGia: thongTinFilm.danhGia,
            hinhAnh: null,
            maNhom: GROUPID
        },
        onSubmit: values => {
            values.maNhom = GROUPID
            //tạo đối tượng form data
            const formData = new FormData();
            // formData.append('tenPhim', formik.values.tenPhim)// gán values lấy được vào formData

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }

                }
            }

            //gọi api
            dispatch(capNhatPhimAction(formData))

            // console.log({ formData }); // không lấy được vì FormData có yêu cầu bảo mật cần phải:
            // console.log('formData', formData.get('tenPhim'));
        },
    });

    const handleChangeDatePicker = (values) => {
        let ngayKhoiChieu = moment(values).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {

        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        //lấy file từ e
        let file = e.target.files[0]

        await formik.setFieldValue('hinhAnh', file);

        // Tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result)
        }

    }

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };


    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h3>Thêm mới phim</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif' />
                <br />
                <img src={imgSrc === '' ? thongTinFilm.hinhAnh : imgSrc} style={{ width: '150px', height: '150px' }} alt='abc' />
            </Form.Item>

            <Form.Item label="" className='text-center'>
                <button type='submit' className='btn btn-primary bg-blue-400'>Cập nhật</button>
            </Form.Item>
        </Form>
    )
}
