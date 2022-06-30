import { quanLyPhimService } from "../../service/QuanLyPhimService";
import { SET_CAROUSEL } from "../Types/CarouselConst";


export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachBanner();

            dispatch({
                type: SET_CAROUSEL,
                arrCarousel: result.data.content
            })
        } catch (error) {

        }
    }
}