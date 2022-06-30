import React from 'react'
import { NavLink } from 'react-router-dom'

export default function StartSignUp() {
    return (
        <div className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3 bg-white">
            <div className="py-3">
                <div className='text-2xl font-bold'>SIGN UP</div>
            </div>
            <div className='p-2 my-2 rounded-xl w-80 bg-blue-500 text-center text-white text-lg font-bold'><i className="fab fa-google-plus-g"></i> Tiếp tục sử dụng Google</div>
            <div className='p-2 my-2 rounded-xl w-80 border-2 text-center text-black text-lg'><i className="fab fa-facebook text-2xl text-blue-500"></i>  Tiếp tục sử dụng Facebook</div>
            <div className='p-2 my-2 rounded-xl w-80 border-2 text-center text-black text-lg'><i className="fab fa-twitter text-2xl text-blue-400"></i> Tiếp tục sử dụng Twitter</div>
            <div className="text-xl">Hoặc</div>
            <div className="flex flex-col space-y-5 w-full">
                <NavLink to='/register' className="w-full rounded-3xl p-2 text-white text-lg font-bold bg-green-600 hover:bg-green-500 transition duration-200 text-center">Đăng ký với email</NavLink>
            </div>
            <div>Bằng cách tạo một tài khoản, tôi đồng ý với HienFilm's <NavLink to='/'>Điều khoản dịch vụ,</NavLink> </div>
            <div> <NavLink to='/'>Chính sách riêng tư</NavLink> Và <NavLink to='/'>Quyền sở hữu trí tuệ</NavLink>  </div>
            <div>Đã từng đăng ký một tài khoản? <NavLink to='/login'>Đăng nhập</NavLink></div>
        </div>
    )
}
