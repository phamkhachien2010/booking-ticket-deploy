import React from 'react'
import Slider from "react-slick";
import Film from '../Film/Film';
import styleSlick from './MultipleRowSlick.module.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}

            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}

const renderFilms = (arrFilm) => {

    return arrFilm?.map((item, index) => {
        return <div className={`${styleSlick['width-item']}`} key={index}  >
            <Film film={item} />
        </div>
    })
}

export default function MultipleRowSlick(props) {

    const {arrFilm} = props

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div>
            <h2> Multiple items </h2>
            <Slider {...settings}>
                {renderFilms(arrFilm)}
                {renderFilms(arrFilm)}
                {renderFilms(arrFilm)}
                {renderFilms(arrFilm)}
            </Slider>
        </div>
    )
}
