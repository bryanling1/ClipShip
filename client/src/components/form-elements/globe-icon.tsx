import GlobeIcon from '@material-ui/icons/Public';
import React from 'react';
import styled from 'styled-components';

const GlobeIconWrapper = styled((otherProps) => <GlobeIcon {...otherProps} />)`
  && {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  }
`;

export default GlobeIconWrapper;
