import styled, { css } from "styled-components";
import Loader from "components/Loader";
import { rgba } from "polished";

function validateProp(prop) {
  return prop || "";
}

const variations = {
  default: {
    background: props => props.theme.primary,
    color: "#ffffff",
    border: "2px solid transparent",
    "box-shadow": "0 0px 0px 0 rgba(0, 0, 0, 0.0)",

    hover: {
      color: props => props.theme.primary,
      background: "transparent",
      border: `2px solid ${props => props.theme.primary}`,
      "box-shadow": `0 10px 20px 0 ${props => rgba(props.theme.primary, 0.2)}`,
    },

    active: {
      color: props => props.theme.primary,
      background: "transparent",
      "border-color": props => props.theme.primary,
    },

    focus: {
      "box-shadow": `0 5px 20px 0 ${props => rgba(props.theme.primary, 0.8)}`,
    },
  },

  stroked: {
    background: "transparent",
    color: props => props.theme.primary,
    border: `2px solid ${props => props.theme.primary}`,
    "box-shadow": "none",

    hover: {
      color: "white",
      background: props => props.theme.primary,
      "box-shadow": `0 10px 20px 0 ${props => rgba(props.theme.primary, 0.2)}`,
    },

    active: {
      color: "white",
      background: props => props.theme.primary,
      "border-color": props => props.theme.primary,
    },

    focus: {
      "box-shadow": `0 5px 20px 0 ${props => rgba(props.theme.primary, 0.8)}`,
    },
  },

  white: {
    background: "white",
    color: props => props.theme.primary,
    border: `none`,
    "box-shadow": "0 0 10px 0 rgba(0,0,0,0.10)",

    hover: {
      color: props => props.theme.primary,
      background: "white",
      "box-shadow": "none",
    },

    active: {
      color: "white",
      background: props => props.theme.primary,
    },

    focus: {
      "box-shadow": "0px 1px 11px 0px rgba(0,0,0, 0.6)",
    },
  },
};

const sizes = {
  default: {
    "font-size": "14px",
    "text-transform": "none",
    "font-weight": 700,
    padding: "15px",
    display: "flex",
    width: "100%",
    height: "50px",
  },

  small: {
    "font-size": "14px",
    "text-transform": "none",
    "font-weight": 400,
    padding: "5px 10px",
    display: "inline-flex",
    width: "auto",
    height: "28px",
  },
};

export const ButtonStyled = styled.button`
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 51px;
  outline: none;
  box-sizing: border-box;
  text-decoration: none;
  transition: 0.2s;
  cursor: pointer;
  line-height: 14px;

  font-size: ${props => sizes[props.size]["font-size"]};
  text-transform: ${props => sizes[props.size]["text-transform"]};
  font-weight: ${props => sizes[props.size]["font-weight"]};
  padding: ${props => sizes[props.size]["padding"]};
  display: ${props => sizes[props.size]["display"]};
  width: ${props => sizes[props.size]["width"]};
  height: ${props => sizes[props.size]["height"]};

  background: ${props => variations[props.variation].background};
  color: ${props => variations[props.variation].color};
  border: ${props => variations[props.variation].border};
  box-shadow: ${props => variations[props.variation]["box-shadow"]};

  &:hover {
    background: ${validateProp(
      props => variations[props.variation].hover.background,
    )};
    color: ${validateProp(props => variations[props.variation].hover.color)};
    box-shadow: ${validateProp(
      props => variations[props.variation].hover["box-shadow"],
    )};
    border: ${validateProp(props => variations[props.variation].hover.border)};
  }

  &:active {
    background: ${props => variations[props.variation].active.background};
    color: ${props => variations[props.variation].active.color};
    border-color: ${validateProp(
      props => variations[props.variation].active["border-color"],
    )};
  }

  &:focus {
    box-shadow: ${props => variations[props.variation].focus["box-shadow"]};
  }

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background: ${props => props.theme.primary} !important;
      border-color: ${props => props.theme.primary} !important;
      color: white !important;
      box-shadow: none !important;
    `}
`;

export const LoaderStyled = styled(Loader)`
  display: inline-block;
  margin-left: 5px;
`;
