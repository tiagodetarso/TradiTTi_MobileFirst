import styled from 'styled-components'

import { M_COLOR, C_TEXT_COLOR } from '../global'

export const BtnWrap = styled.div`
    width: 100%;
    
    .buttonDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    .button {
        font-size: 20px;
        font-weight: bold;
        width: 230px;
        height: 50px;
        border-radius: 5px;
        color: ${C_TEXT_COLOR};
        background-color: ${M_COLOR};
    }
`