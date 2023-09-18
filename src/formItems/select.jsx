// eslint-disable-next-line no-unused-vars
import React from 'react'
import {SelectWrap} from './selectStyles'

export default function Select ({ name, text, size, ops, handleOnChange, value }) {
    
    let options = []

    if (Array.isArray(ops)) {
        options = ops.map(op => (
            <option key={op.name ? op.name : op} value={op.value ? op.value : op}>{op.name ? op.name : op}</option>
        ))
    }

    return (
        <SelectWrap>
            <label htmlFor={name}>{text}</label>
            <select id={name} name={name} size={size} value={value} onChange={handleOnChange}>
                <option id='instruction' value="Escolha" hidden>Escolha</option>
                {options}
            </select>
        </SelectWrap>
    )
}