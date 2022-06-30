import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';


export default function HomeCarousel(props) {

    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
    };

    const { arrCarousel } = useSelector(state => state.HomeCarouselReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getCarouselAction())

        return () => {

        }
    }, [])


    const renderCarousel = () => {
        return arrCarousel?.map((carousel, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${carousel.hinhAnh})` }}>
                    <img src={carousel.hinhAnh} className='w-full opacity-0' alt="" />
                </div>
            </div>
        })
    }

    return (
        <Carousel style={{width:'100%'}} autoplay effect='fade'>
            {renderCarousel()}
        </Carousel>
    )
}
