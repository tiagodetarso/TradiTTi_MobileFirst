import styled from 'styled-components'
import { C_COLOR2, C_COLOR1 } from '../global'

export const LoadingWrap = styled.div`
    width:100%;
    height:100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${C_COLOR2};
    background-color: ${C_COLOR1};

    img {
        width: 75px;
    }
`