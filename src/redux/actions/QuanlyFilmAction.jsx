import { history } from "../../App";
import { quanLyPhimService } from "../../service/QuanLyPhimService";
import { STATUS_CODE } from "../../util/setting/config";
import { LAY_THONG_TIN_PHIM, SET_LIST_FILM } from "../Types/CarouselConst";



export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            dispatch({
                type: SET_LIST_FILM,
                arrFilm: result.data.content
            })
        } catch (error) {

        }
    }
}

export const themPhimUploadinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData);

            if (result.status === STATUS_CODE.SUCCESS) {
                alert('Thêm phim thành công')
            }


        } catch (error) {

        }
    }
}

export const layThongTinFilmAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);

            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_PHIM,
                    thongTinFilm: result.data.content
                })
            }


        } catch (error) {

        }
    }
}

export const capNhatPhimAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(formData);

            if (result.status === STATUS_CODE.SUCCESS) {
                alert('Cập nhật phim thành công');
                dispatch(layDanhSachPhimAction());
                history.push('/admin/films')
            }


        } catch (error) {

        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);

            if (result.status === STATUS_CODE.SUCCESS) {
                alert('Xoá phim thành công');
                dispatch(layDanhSachPhimAction());
                history.push('/admin/films')
            }


        } catch (error) {

        }
    }
}