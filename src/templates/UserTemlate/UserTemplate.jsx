import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';




export const UserTemplate = (props) => {

    useEffect(() => {

        window.scrollTo(0, 0)

        return () => {

        }
    })


    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        //propsRoute trả về props.location, props.history, props.match
        return <div style={{ background: 'url(https://wallpapercave.com/wp/wp2841676.jpg)', backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="min-h-screen flex justify-center items-center" >

                <Component {...propsRoute} />

                <div className="absolute bottom-0 w-full p-3 flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
                    <div>
                        <NavLink to="/" className="hover:underline underline-offset-1 text-white mx-2 cursor-pointer">Home </NavLink>
                        <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-white mx-2 cursor-pointer">Contact Us</NavLink>
                        <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-white mx-2 cursor-pointer">Privacy</NavLink>
                        <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-white mx-2 cursor-pointer">Legal</NavLink>
                        <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-white mx-2 cursor-pointer">Policy </NavLink>

                    </div>

                </div>
            </div>

        </div>
    }} />

}