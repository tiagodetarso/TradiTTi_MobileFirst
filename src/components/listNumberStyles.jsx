import styled from 'styled-components'
import { C_COLOR2, C_COLOR1 } from '../global'

export const ListNumberWrap = styled.div`
    width:100%;
    border: 1px solid ${C_COLOR2};
    background-color: ${C_COLOR1};

    .plusMinus {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .quantity {
        border-radius: 7px;
        width: 25px;
        text-align: center;
        padding: 2px;
    }
    .minus {
        background-color: ${C_COLOR1};
        border: none;
        color: red;
        font-size: 20px;
        padding-top: 5px;
    }
    .plus {
        background-color: ${C_COLOR1};
        border: none;
        color: green;
        font-size: 20px;
        padding-top: 5px;
    }
`