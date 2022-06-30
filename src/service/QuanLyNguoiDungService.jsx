import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super()
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }

    dangNhap = (user) => { //taiKhoan, matKhau
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, user)
    }

    lichSuDatVe = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    }

    tuThayDoiThongTinNguoiDung = (thongTinNguoiDung) => {
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinNguoiDung)
    }

    capNhatThongTinNguoiDung = (thongTinNGuoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNGuoiDung)
    }

    layDanhSachNguoiDung = (key = '') => {
        if (key !== '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${key}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    themNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung)
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()