// eslint-disable-next-line no-unused-vars
import React from 'react'
import { TxtAreaWrap } from './textAreaStyles'

export default function TextArea ({ text, name, cols, rows, maxLength, placeholder, handleOnChange, value }) {
    return (
        <TxtAreaWrap>
            <label htmlFor={name}>{text}</label>
            <textarea
                id={name} 
                name={name} 
                cols={cols} 
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
            ></textarea>
        </TxtAreaWrap>
    )
}

