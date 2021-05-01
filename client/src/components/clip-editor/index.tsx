import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import DeleteClipModal from '../modal/modals/delete-clip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Options from './options';
import Player from '../player';
import React, { useState } from 'react';
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
  const { project, clips, editClipStartEnd, deleteClip } = props;
  const { selectedClip } = project;
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const handleChangeStartEnd = (start: number, end: number) => {
    if (selectedClip !== null) {
      editClipStartEnd({ index: selectedClip, start, end });
    }
  };
  const handleCloseDeleteClipModal = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteClip = () => {
    if (selectedClip !== null) {
      deleteClip(selectedClip);
    }
  };
  const clip = selectedClip !== null && clips[selectedClip];

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

      <DeleteClipModal
        open={isDeleteModal}
        handleClose={handleCloseDeleteClipModal}
        handleDelete={handleDeleteClip}
      />
      {project.name && clips.length > 0 && clip && (
        <>
          <Left>
            <IconButtonWrapper
              onClick={() => {
                setIsDeleteModal(true);
              }}
            >
              <DeleteIcon />
            </IconButtonWrapper>
            <Player
              onStartEndChange={handleChangeStartEnd}
              url={clip.url}
              start={clip.start}
              end={clip.end}
              length={clip.duration}
              title={clip.title}
              broadcaster={clip.broadcaster}
              height={570}
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
  padding: 15px;
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

const IconButtonWrapper = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -10px;
    margin-right: 10px;
  }
`;

const TypographyNoProject = styled(Typography)`
  text-align: center;
  width: 100%;
  color: rgba(0, 0, 0, 0.54);
`;
