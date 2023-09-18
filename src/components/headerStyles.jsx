import styled from 'styled-components'
import { C_COLOR2, M_COLOR } from '../global'

export const HeaderWrap = styled.div`
    width:100%;
    border: 1px solid ${C_COLOR2};
    background-color: ${M_COLOR};

    .imageDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        max-height: 350px;
        width: 60%;
    }
`