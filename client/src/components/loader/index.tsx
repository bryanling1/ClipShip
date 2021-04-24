import Progress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';

const ProgressWrapper = styled((props) => <Progress {...props} />)`
  && {
    margin: auto;
    margin-top: ${(props) => (props.margintop ? props.margintop : 'auto')};
    color: rgb(136, 84, 208);
    display: block;
  }
`;

export default ProgressWrapper;
