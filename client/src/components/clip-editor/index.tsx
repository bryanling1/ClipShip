import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import Options from './options';
import Player from '../player';
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

const ClipEditor = (props: Props): JSX.Element => {
  const { project, clips, editClipStartEnd } = props;
  const { selectedClip } = project;
  const handleChangeStartEnd = (start: number, end: number) => {
    if (selectedClip !== null) {
      editClipStartEnd({ index: selectedClip, start, end });
    }
  };
  const clip = selectedClip !== null && clips[selectedClip];
  const useLabel: boolean =
    clip &&
    clip.label &&
    (clip.labelGlobal
      ? clip.labelGlobalPosition !== null
      : clip.label && clip.labelPosition !== null);
  const labelPosition = clip && (clip.labelGlobal ? clip.labelGlobalPosition : clip.labelPosition);
  return (
    <MainWrapper>
      {!project.name && (
        <TypographyNoProject>
          Name Your Project <b>Above</b> to Begin
        </TypographyNoProject>
      )}
      {project.name && !clips.length && (
        <TypographyNoProject>
          Click <b>+ Below</b> to Add Clips to your Project
        </TypographyNoProject>
      )}
      {project.name && clips.length > 0 && clip && (
        <>
          <Left>
            <Player
              onStartEndChange={handleChangeStartEnd}
              url={clip.url}
              start={clip.start}
              end={clip.end}
              length={clip.duration}
              title={clip.title}
              broadcaster={clip.broadcaster}
              height={570}
              label={useLabel}
              labelPosition={labelPosition || 0}
            />
          </Left>
          <Right>
            <Options />
          </Right>
        </>
      )}
    </MainWrapper>
  );
};

export default connector(ClipEditor);

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white1};
  width: 100%;
  min-height: 500px;
  margin-bottom: 20px;
  display: flex;
  height: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
`;

const Left = styled.div`
  flex: 0.6;
  height: 100%;
  padding-right: 30px;
  position: relative;
`;

const Right = styled.div`
  flex: 0.4;
  height: 100%;
  box-sizing: border-box;
`;

const TypographyNoProject = styled(Typography)`
  text-align: center;
  width: 100%;
  color: white;
`;
