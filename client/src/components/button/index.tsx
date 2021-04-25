import Button from '@material-ui/core/Button';
import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled((otherProps) => <Button {...otherProps} />)`
  && {
    background-color: rgb(136, 84, 208);
    color: white;
    margin: auto;
    display: flex;
    margin-left: ${(props) => (props.marginleft >= 0 ? `${props.marginleft}px` : 'auto')};
    height: ${(props) => (props.height ? `${props.height}px` : 'intial')};
    padding: ${(props) => (props.padding ? `${props.padding}px` : 'intial')};
  }
  &&: hover {
    background-color: rgb(136, 84, 208);
  }
`;

export default ButtonWrapper;
