import { SET_CAROUSEL } from "../Types/CarouselConst"

const initialState = {
    arrCarousel: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
        },
    ]
}

export const HomeCarouselReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CAROUSEL: {
            return { ...state, arrCarousel: action.arrCarousel }
        }
        default:
            return { ...state }
    }
}
