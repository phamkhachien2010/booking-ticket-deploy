import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { themPhimUploadinhAction } from '../../../../redux/actions/QuanlyFilmAction';
import { GROUPID } from '../../../../util/setting/config';


export default function Addnew(props) {

    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            mota: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
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
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }

            //gọi api
            dispatch(themPhimUploadinhAction(formData))

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

    const handleChangeFile = (e) => {
        //lấy file từ e
        let file = e.target.files[0]

        // Tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result)
        }
        formik.setFieldValue('hinhAnh', file)
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
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif' />
                <br />
                <img src={imgSrc} style={{ width: '150px', height: '150px' }} alt='abc' />
            </Form.Item>

            <Form.Item label="" className='text-center'>
                <button type='submit' className='btn btn-primary bg-blue-400'>Thêm phim</button>
            </Form.Item>
        </Form>
    )
}
