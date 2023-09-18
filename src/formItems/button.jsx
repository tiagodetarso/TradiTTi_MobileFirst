// eslint-disable-next-line no-unused-vars
import React from 'react'

//styles
import { BtnWrap } from './buttonStyles'


// eslint-disable-next-line react/prop-types
export default function Button ({ text, handleOnClick }) {

    return (
        <BtnWrap>
            <div className="buttonDiv">
                <button
                    className="button"
                    onClick={handleOnClick}
                >
                    { text }
                </button>
            </div>
        </BtnWrap>
    )
}