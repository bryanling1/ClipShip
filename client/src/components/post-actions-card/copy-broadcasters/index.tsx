import * as actions from '../../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { StoreState } from '../../../store/reducers/types';
import CopyButton from '../../form-elements/button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  clips: state.clips,
  project: state.project,
});
const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CopyBroadcasters = (props: Props): JSX.Element => {
  const { clips } = props;
  const temp = {};
  const links = clips
    .filter((clip) => {
      if (clip.broadcaster in temp) {
        return false;
      } else {
        temp[clip.broadcaster] = true;
        return true;
      }
    })
    .map((clip) => `http://twitch.tv/${clip.broadcaster}\n`)
    .join('');
  return (
    <MainWrapper>
      <TypographyWrapperBold> Tools </TypographyWrapperBold>
      <FlexMargin />
      <CopyToClipboard text={links}>
        <CopyButton variant="contained" startIcon={<FileCopyIcon />}>
          Copy Broadcaster Links
        </CopyButton>
      </CopyToClipboard>
    </MainWrapper>
  );
};

export default connector(CopyBroadcasters);

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const FlexMargin = styled.div`
  width: 100%;
  height: 10px;
`;

const TypographyWrapperBold = styled(Typography)`
  && {
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;
