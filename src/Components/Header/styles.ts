import styled from 'styled-components'

export const Hero = styled.header`
  display: block;
  width: 100%;
  // height: 364px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const Container = styled.div`
  height: 364px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 64px;

  img {
    display: block;
    margin: 0 auto;
    width: 125px;
  }

  h1 {
    padding-bottom: 40px;
    margin: 0 auto;
    max-width: 540px;
    font-weight: 900;
    font-size: 36px;
    line-height: 43px;
    text-align: center;
  }
`
