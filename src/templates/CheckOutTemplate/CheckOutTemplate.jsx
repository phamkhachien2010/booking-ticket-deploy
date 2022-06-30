import React, { Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { USER_LOGIN } from '../../util/setting/config';



export const CheckOutTemplate = (props) => {

    useEffect(() => {

        window.scrollTo(0, 0)

        return () => {

        }
    })


    const { Component, ...restProps } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute) => {
        //propsRoute trả về props.location, props.history, props.match
        return <>

            <Component {...propsRoute} />

        </>
    }} />

}
