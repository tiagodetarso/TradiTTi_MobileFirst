// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'

//images
import logo from '../../images/logoBostonAlt.jpg'

//styles
import  { HeaderWrap } from './headerStyles'

export default function Header() {

    return (
        <HeaderWrap>
            <div className="imageDiv">
                <img className="image" src={logo} alt="logo"/>
            </div>
        </HeaderWrap>
    )
}