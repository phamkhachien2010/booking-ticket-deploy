import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import { ThongTinNguoiDung } from "../../_cores/models/ThongTinNguoiDung";
import { ThongTinTaiKhoan } from "../../_cores/models/ThongTinTaiKhoan";
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "../Types/CarouselConst"

let userDefault = {}
if (localStorage.getItem(USER_LOGIN)) {
    userDefault = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: userDefault,
    thongTinTaiKhoan: new ThongTinTaiKhoan(),
    danhSachNguoiDung: [],
    nguoiDung: new ThongTinNguoiDung()
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case DANG_NHAP_ACTION: {
            const { user } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(user));
            localStorage.setItem(TOKEN, user.accessToken);
            return { ...state, userLogin: user }
        }

        case SET_THONG_TIN_TAI_KHOAN: {
            return { ...state, thongTinTaiKhoan: action.thongTinTaiKhoan }
        }

        case SET_DANH_SACH_NGUOI_DUNG: {
            return { ...state, danhSachNguoiDung: action.danhSachNguoiDung }
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            return { ...state, nguoiDung: action.nguoiDung }
        }

        default:
            return { ...state }
    }
}
