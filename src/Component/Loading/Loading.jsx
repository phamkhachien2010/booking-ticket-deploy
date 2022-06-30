import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer)

    if (isLoading) {
        return (
            <div className='flex justify-center items-center z-20' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <div className='text-4xl text-white' >
                    <img style={{ backgroundColor: 'transparent' }} src={require('../../assets/img/Loading/loading.gif')} alt="" />
                </div>
            </div>
        )
    } else {
        return ''
    }


}
