import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel';




export const HomeTemplate = (props) => {

    useEffect(() => {

        window.scrollTo(0, 0)

        return () => {

        }
    })


    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        //propsRoute trả về props.location, props.history, props.match
        return <>
            <Header {...propsRoute} />

            <Component {...propsRoute} />

            <Footer {...propsRoute} />
        </>
    }} />

}