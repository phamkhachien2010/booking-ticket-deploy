import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RSwiper from '../../Component/RSwiper/RSwiper';
import { layDanhSachPhimAction } from '../../redux/actions/QuanlyFilmAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanlyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home(props) {

  const { arrFilm } = useSelector(state => state.QuanLyFilmReducer);
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachHeThongRapAction())

    return () => {

    }
  }, [])

  return (
    <div>
      <HomeCarousel />
      <div className='container'>
        <RSwiper arrFilm={arrFilm} />

        <HomeMenu heThongRapChieu={heThongRapChieu} />

      </div>
    </div>
  )
}
