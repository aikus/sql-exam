import styled from "styled-components";
import '../../../styles/app.css';

export const Base = styled.div`
  display: flex;
  background-color: var(--authorization-background-color);
  box-shadow: 0 2px 4px rgb(135 145 151 / 24%);
  padding: 32px 0;
  border-radius: 8px;
  margin-top: 24px;
`

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    & > h2 {
        margin: 0;
    }
`

export const NoContent = styled.div`
  width: 100%;
  text-align: center;
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 16px;

  @media screen and (min-width: 1024px) {
    margin: 0 24px 0 16px;
  }

  @media screen and (min-width: 1440px) {
    margin: 0 32px 0 16px;
  }
`

export const Tile = styled.div`
  width: ${props => `${(props.blockWidth - 1 - 16) / 2}px`};
  cursor: pointer;
  
  & > img {
    width: 100%;
    border-radius: 4px;
  }

  @media screen and (min-width: 870px) {
    width: ${props => `${(props.blockWidth - 1 - 16 * 2) / 3}px`};
  }

  @media screen and (min-width: 1440px) {
    width: ${props => `${(props.blockWidth - 1 - 16 * 3) / 4}px`};
  }
`

export const TileDescription = styled.div`
  margin-top: 8px;
`