import { quanLyRapService } from "../../service/QuanLyRapService";
import { SET_CHI_TIET_PHIM, SET_LIST_RAP } from "../Types/CarouselConst";


export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuHeThongRap();

            dispatch({
                type: SET_LIST_RAP,
                heThongRapChieu: result.data.content
            })
        } catch (error) {
            console.log('errors', error.response?.data);
        }
    }
}

export const layThongTinLichChieuPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);

            dispatch({
                type: SET_CHI_TIET_PHIM,
                phimDetail: result.data.content
            })
        } catch (error) {
            console.log('errors', error.response?.data);
        }
    }
}