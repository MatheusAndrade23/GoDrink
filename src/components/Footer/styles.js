import styled, { css } from 'styled-components';

export const Footer = styled.footer`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: ${theme.colors.fourthColor};
    border-top: 2px solid ${theme.colors.primaryColor};
    padding: ${theme.spacings.medium};

    & p,
    a {
      margin: ${theme.spacings.xsmall};
    }
  `}
`;
