import styled from 'styled-components'
import { C_COLOR2, D_COLOR2, C_TEXT_COLOR } from '../global'

const media = {
   smallPhone : '@media(min-width: 250px)',
   phone1: '@media(min-width: 320px)',
   phone2: '@media(min-width: 400px)',
   tablet1: '@media(min-width: 550px)',
   tablet2: '@media(min-width: 725px)',
   desktop: '@media(min-width: 900px)'
}

export const ListWrap = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    border: 1px solid ${C_COLOR2};
    background-color: ${D_COLOR2};

    .categoryTitle {
        display: flex;
        color: ${C_TEXT_COLOR};
        justify-content: center;
        font-family: cursive;
    }

    .list {
        ${media.smallPhone} {
            width: 260px;
        };
        ${media.phone1} {
            width: 300px;
        };
        ${media.phone2} {
            width: 380px;
        };
        ${media.tablet1} {
            width: 520px;
        };
        ${media.tablet2} {
            width: 700px;
        };
        ${media.desktop} {
            width: 850px;
        }
    }
    `