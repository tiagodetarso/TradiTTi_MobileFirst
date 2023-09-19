import styled from 'styled-components'
import { C_COLOR1, M_COLOR } from '../global'

export const MenuWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: 1px solid ${M_COLOR};
    background-color: ${C_COLOR1};

    h2 {
        margin:0;
        text-align: center;
        font-family: cursive
    }

    h3 {
        margin:0;
        text-align: center;
        font-weight: normal;
        font-family: arial;
    }
`