import { ThongTinLichChieu } from "../../_cores/models/ThongTinPhongVe"
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB_DAT_VE, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../Types/CarouselConst"

const initialState = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    danhSachGheKhachDangDat: [{
        maGhe: 56362,

    },
    {
        maGhe: 56379,

    }],
    tabActive: '1'
}

export const QuanlyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHI_TIET_PHONG_VE: {
            return { ...state, chiTietPhongVe: action.chiTietPhongVe }
        }

        case DAT_VE: {
            //Cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = state.danhSachGheDangDat;
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }

            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }

        case DAT_VE_HOAN_TAT: {
            return { ...state, danhSachGheDangDat: [] }
        }

        case CHUYEN_TAB_DAT_VE: {
            state.tabActive = '2'
            return { ...state }
        }

        case CHANGE_TAB_ACTIVE: {

            return { ...state, tabActive: action.tab }
        }

        case DAT_GHE: {
            return { ...state, danhSachGheKhachDangDat: action.danhSachGheKhachDangDat }
        }

        default:
            return { ...state }
    }
}
