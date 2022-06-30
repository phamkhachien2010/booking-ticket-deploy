import { useFormik } from 'formik';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { quanLyNguoiDungService } from '../../service/QuanLyNguoiDungService';
import { STATUS_CODE } from '../../util/setting/config';

export default function Register(props) {

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      hoTen: ''
    },
    onSubmit: async values => {
      try {
        let result = await quanLyNguoiDungService.dangKy(values)
        if (result.status === STATUS_CODE.SUCCESS) {
          alert('Đăng ký thành công')
        }
        history.push('/login')
      } catch (error) {
        console.log("error", error.respose?.data);
        alert(error.respose?.data.content)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
      <div className="py-2">
        <div className='text-2xl font-bold'>CREATE AN ACCOUNT</div>
      </div>
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="User name" name='taiKhoan' onChange={formik.handleChange} />
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Password" name='matKhau' type='password' onChange={formik.handleChange} />
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Email" name='email' type='email' onChange={formik.handleChange} />
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Số điện thoại" name='soDt' onChange={formik.handleChange} />
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Họ tên" name='hoTen' onChange={formik.handleChange} />
      <div className="flex flex-col space-y-5 w-full">
        <button type="submit" className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">Sign up</button>
        <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
          <div className="-mt-1 font-bod bg-gray-600 text-white font-bold px-5 absolute">Or</div>
        </div>
        <NavLink to='/login' className="w-full border-blue-900 border-[2px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200 text-center">Login</NavLink>
      </div>
    </form>
  )
}
