import { history } from "../../App";
import { quanLyNguoiDungService } from "../../service/QuanLyNguoiDungService";
import { GROUPID, STATUS_CODE } from "../../util/setting/config";
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "../Types/CarouselConst";
import { DisplayLoadingAction, HideLoadingAction } from "./LoadingAction";


export const dangNhapAction = (user) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(user);

            if (result.data.statusCode === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    user: result.data.content
                })
                history.push('/');
            }



        } catch (error) {
            alert(error.response?.data.content)
            console.log({ error });
        }
    }
}


export const layThongTinTaiKhoan = () => {
    return async (dispatch) => {
        dispatch(DisplayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.lichSuDatVe();

            if (result.data.statusCode === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    thongTinTaiKhoan: result.data.content
                })
            }
            dispatch(HideLoadingAction)

        } catch (error) {
            console.log('error',error.response?.data);
        }
        dispatch(HideLoadingAction)
    }
}

export const layDanhSachNguoiDung = (key ='') => {
    return async (dispatch) => {
        dispatch(DisplayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(key);

            if (result.data.statusCode === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
            dispatch(HideLoadingAction)

        } catch (error) {
            console.log('error',error.response?.data);
        }
        dispatch(HideLoadingAction)
    }
}

export const xoaNguoiDung = (taiKhoan) => {
    return async (dispatch) => {
        dispatch(DisplayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);

            if (result.data.statusCode === STATUS_CODE.SUCCESS) {
                alert('Xoá thành công')
                dispatch(layDanhSachNguoiDung())
            }
            dispatch(HideLoadingAction)

        } catch (error) {
            alert(error.response?.data.content)
            console.log('error',error.response?.data);
        }
        dispatch(HideLoadingAction)
    }
}

export const themNguoiDung = (nguoiDung) => {
    return async (dispatch) => {
        dispatch(DisplayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);

            if (result.data.statusCode === STATUS_CODE.SUCCESS) {
                alert('Thêm người dùng thành công')
                history.push('/admin')
            }
            dispatch(HideLoadingAction)

        } catch (error) {
            alert(error.response?.data.content)
            console.log('error',error.response?.data);
        }
        dispatch(HideLoadingAction)
    }
}