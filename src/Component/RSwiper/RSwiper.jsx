import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./RSwiper.css";

// import required modules
import { Navigation } from "swiper";
import Film_Flip from '../Film/Film_Flip';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/Types/CarouselConst';

export default function RSwiper(props) {

    const dispatch = useDispatch()

    const { arrFilm } = props;

    const renderCardFilm = () => {
        return arrFilm?.slice(0, 12).map((film, index) => {
            return <SwiperSlide className='mt-3 mb-20' key={index}>
                <Film_Flip film={film} />
            </SwiperSlide>
        })
    }

    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyFilmReducer)

    let activeFilmDangChieu = dangChieu ? 'activeChieuFilm' : 'none_activeChieuFilm'
    let activeFilmSapChieu = sapChieu ? 'activeChieuFilm' : 'none_activeChieuFilm'

    return (
        <div className='mt-5'>
            <button className={`${activeFilmDangChieu} font-bold py-2 px-4 rounded mr-2`} onClick={() => {
                dispatch({
                    type: SET_FILM_DANG_CHIEU
                })
            }}>PHIM ĐANG CHIẾU</button>
            <button className={`${activeFilmSapChieu} font-bold py-2 px-4 rounded`} onClick={() => {
                dispatch({
                    type: SET_FILM_SAP_CHIEU
                })
            }}>PHIM SẮP CHIẾU</button>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                slidesPerGroup={4}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {renderCardFilm()}
            </Swiper>
        </div>
    )
}
