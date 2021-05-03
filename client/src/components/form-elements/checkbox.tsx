import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled((otherProps) => <Checkbox {...otherProps} />)`
  && > .MuiIconButton-label > .MuiSvgIcon-root {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  && > .MuiIconButton-label:hover > .MuiSvgIcon-root:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  &&& .MuiCheckbox-colorSecondary {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  &&& {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : '#aaa')};
  }

  &&&&:hover {
    background-color: ${(props) =>
      props.accent ? props.theme.colors.primaryShadow : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export default CheckboxWrapper;
