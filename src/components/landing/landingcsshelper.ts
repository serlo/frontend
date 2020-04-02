import { css } from 'styled-components'
import { lighten } from 'polished'

export const makeSVGStyle = ({ Parent }) => {
  return css`
      .blue {
        fill: ${props => props.theme.colors.lighterblue};
        transition: all .2s ease-in-out;
      }
      .green {
        fill: #becd2b;
        transition: all .2s ease-in-out;
      }
      @media (min-width: ${props => props.theme.breakpoints.sm}) {
        .blue {
          fill: ${props => lighten(0.07, props.theme.colors.lighterblue)};
        }
      }
      /* animations */
      & {
        width: 6rem;
        height: 6rem;
        margin-top: 1rem;
        margin-right: 1rem;
        transition: transform .4s cubic-bezier(0.175, 0.885, 0.320, 1.275);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        animation-play-state: paused;
        &.math { transition-duration: .6s; }
        &.sus path.water{
          transform: scale(0) translateY(-30px);
          transform-origin: 9% 60%;
          transition: transform .6s cubic-bezier(0.175, 0.6, 0.32, 1.275);
        }
      }
      
      @media (min-width: ${props => props.theme.breakpoints.lg}) {
        display: block;
        margin: 0 auto;
        width: auto;
        height: auto;
        max-width: 120px;
      }

      @media (min-width: 1470px) {
        max-width: 100%;
      }

      ${Parent}:hover &, ${Parent}:focus &, ${Parent}:active & {
        &.bio { animation: jump .7s ease-in-out; }
        &.abc { transform: scale(1.25) rotate(10deg); }
        &.math { transform: rotateY(-180deg) rotateX(-3deg); }
        &.sus { transform: rotate(-30deg); }
        &.sus .blue.water{ transform: scale(1.08); }
        .blue { fill: ${props => props.theme.colors.brand}; } /* TODO: Helperblue */
        .green { fill: #becd2b; }
      }
      
      @keyframes jump {
        16% { transform: translateY(1rem); }
        33% { transform: translateY(-.6rem); }
        50% { transform: translateY(.4rem); }
        67% { transform: translateY(0); }
        100% { transform: translateY(0); }
      }
  
    `
}