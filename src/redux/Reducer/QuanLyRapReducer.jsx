import { SET_LIST_RAP } from "../Types/CarouselConst"

const initialState = {
    heThongRapChieu: []
}

export const QuanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_RAP: {
            return { ...state, heThongRapChieu: action.heThongRapChieu }
        }
        default:
            return { ...state }
    }
}
