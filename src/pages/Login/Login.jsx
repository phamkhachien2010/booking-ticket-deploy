import React from 'react'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login(props) {

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      dispatch(dangNhapAction(values))
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
      <div className="py-8">
        <div className='text-2xl font-bold'>LOGIN</div>
      </div>
      <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="User name" name='taiKhoan' onChange={formik.handleChange} />
      <div className="flex flex-col space-y-1">
        <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Password" name='matKhau' type='password' onChange={formik.handleChange} />
        <p className="font-bold text-white text-right cursor-pointer">Forgot password?</p>
      </div>
      <div className="flex flex-col space-y-5 w-full">
        <button type="submit" className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">Log in</button>
        <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
          <div className="-mt-1 font-bod bg-gray-600 text-white font-bold px-5 absolute">Or</div>
        </div>
        <NavLink to='/signUp' className="w-full border-blue-900 border-[2px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200 text-center">Sign Up</NavLink>
      </div>
    </form>

  )
}
