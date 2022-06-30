import { connection } from "../..";
import { quanLyDatVeService } from "../../service/QuanLyDatVeService";
import { STATUS_CODE } from "../../util/setting/config";
import { CHUYEN_TAB_DAT_VE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../Types/CarouselConst";
import { DisplayLoadingAction, HideLoadingAction } from "./LoadingAction";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {

        try {
            const result = await quanLyDatVeService.layChiTietPhongve(maLichChieu);

            dispatch({
                type: SET_CHI_TIET_PHONG_VE,
                chiTietPhongVe: result.data.content
            })
        } catch (error) {

        }

    }
}

export const datVeAction = (thongTinDatVe) => {

    return async (dispatch, getState) => {

        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        dispatch(DisplayLoadingAction)

        try {
            const result = await quanLyDatVeService.datVe(thongTinDatVe);

            if (result.status === STATUS_CODE.SUCCESS) {
                await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
                await dispatch({ type: DAT_VE_HOAN_TAT })
                await dispatch(HideLoadingAction)
                dispatch({ type: CHUYEN_TAB_DAT_VE })
                await connection.invoke("datGheThanhCong", taiKhoan, thongTinDatVe.maLichChieu)
                
            }

        } catch (error) {
            console.log(error.response.data);
        }

        dispatch(HideLoadingAction)


    }
}

export const datGheaction = (ghe, maLichChieu) => {

    return async (dispatch, getState) => {

        //đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })

        //call api
        let danhSachGheDangDat = JSON.stringify(getState().QuanlyDatVeReducer.danhSachGheDangDat);
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        // danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

        connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu)

    }
}