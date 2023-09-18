import styled from 'styled-components'
import { C_COLOR2, C_COLOR1 } from '../global'

const media = {
   smallPhone : '@media(min-width: 250px)',
   phone1: '@media(min-width: 320px)',
   phone2: '@media(min-width: 400px)',
   tablet1: '@media(min-width: 550px)',
   tablet2: '@media(min-width: 725px)',
   desktop: '@media(min-width: 900px)'
}

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