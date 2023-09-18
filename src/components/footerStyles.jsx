import styled from 'styled-components'
import { C_COLOR1, C_COLOR2, M_COLOR, D_COLOR2 } from '../global'

const media = {
    other: '@media(min-width: 568px)'
}

export const FooterWrap = styled.div`
    width:100%;
    border: 1px solid ${C_COLOR2};
    background-color: ${M_COLOR};

    .social_list {
        display: flex;
        justify-content: space-evenly;
        list-style-type: none;
        font-size: 50px;
        margin:5px;
        padding:5px;

        ${media.other} {
            font-size: 75px
        }
        
        a {
            color: ${C_COLOR1};
        }
    }

    li {
        padding: 5px;
    }
    
    .copy_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 10px;
        padding: 10px;
        text-shadow: -0.5px 0.5px 1px rgba(0, 0, 0, 0.5), 0.5px -0.5px 0 rgba(255, 255, 224, 0.9);

        ${media.other} {
            font-size: 19px
        }

        a {
            color: ${D_COLOR2};
        }
    }
`