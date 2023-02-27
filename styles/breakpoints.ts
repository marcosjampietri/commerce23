import { css } from "styled-components";

interface MediaQueryProps {
    [key: string]: number;
}

const size: MediaQueryProps = {
    small: 400,
    med: 960,
    large: 1140,
};

export const below = Object.keys(size).reduce((acc: any, label: string) => {
    acc[label] = (...args: [any]) => css`
        @media (max-width: ${size[label] / 16}em) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});
