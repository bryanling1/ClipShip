import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled((otherProps) => <Checkbox {...otherProps} />)`
  && > .MuiIconButton-label > .MuiSvgIcon-root {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiIconButton-label:hover > .MuiSvgIcon-root:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&& .MuiCheckbox-colorSecondary {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&& {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&&&:hover {
    background-color: ${(props) =>
      props.accent ? props.theme.colors.primaryShadow : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export default CheckboxWrapper;
