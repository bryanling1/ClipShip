import * as actions from '../../store/actions';
import { Clip } from '../../store/reducers/types';
import { ConnectedProps, connect } from 'react-redux';
import Clips from './clips';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './form';
import Player from '../player';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const connector = connect(null, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = PropsFromRedux & OwnProps;

const ClipSelectModal = (props: Props): JSX.Element => {
  const { open, onClose, addClips } = props;
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedClip, setSelectedClip] = useState<number>();
  const handleAddClips = (clips: Clip[]) => {
    if (clips.length > 0) {
      onClose();
      addClips(clips);
    }
  };
  const handleClickClip = (index: number) => {
    setSelectedClip(index);
  };
  const handleSearch = async (game: string, limit: number) => {
    setLoading(true);
    setSelectedClip(0);
    setClips([]);
    const query = `http://localhost:5000/getClips?game=${game}&limit=${limit}`;
    const result = await axios.get<Clip[]>(query);
    if (result && result.data.length) {
      setClips(result.data);
      setSelectedClip(0);
    }
    setLoading(false);
  };
  const handleChangeStartEnd = (start: number, end: number) => {
    if (selectedClip !== undefined) {
      const temp = [...clips];
      temp[selectedClip].start = start;
      temp[selectedClip].end = end;
      setClips(temp);
    }
  };
  useEffect(() => {
    if (!open && clips.length) {
      setClips([]);
      setSelectedClip(undefined);
    }
  }, [open, JSON.stringify(clips)]);
  const clip =
    selectedClip !== undefined && selectedClip >= 0 && selectedClip < clips.length
      ? clips[selectedClip]
      : undefined;
  const clipUrl = clip && clip.url;
  const clipStart = clip && clip.start;
  const clipEnd = clip && clip.end;
  const clipDuration = clip && clip.duration;
  const clipTitle = clip && clip.title;
  const clipBroadcaster = clip && clip.broadcaster;

  return (
    <DialogWrapper open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitleWrapper>Find and Add Clips</DialogTitleWrapper>
      <DialogContent>
        <TopHalf>
          <Form onSearch={handleSearch} loading={loading} />
        </TopHalf>
        <FlexWrapper>
          <FirstHalf>
            <Clips
              clips={clips}
              onAddClips={handleAddClips}
              loading={loading}
              onClick={handleClickClip}
              selectedIndex={selectedClip !== undefined ? selectedClip : -1}
            />
          </FirstHalf>
          <SecondHalf>
            <Player
              url={clipUrl}
              onStartEndChange={handleChangeStartEnd}
              start={clipStart}
              end={clipEnd}
              length={clipDuration}
              title={clipTitle}
              broadcaster={clipBroadcaster}
              height={470}
            />
          </SecondHalf>
        </FlexWrapper>
      </DialogContent>
    </DialogWrapper>
  );
};

export default connector(ClipSelectModal);

const DialogWrapper = styled(Dialog)`
  && > .MuiDialog {
    &-container {
      align-items: start;
    }
  }

  && .MuiPaper-root .MuiDialogContent-root {
    overflow-x: hidden;
  }
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const TopHalf = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;
const FirstHalf = styled.div`
  flex: 0.55;
  padding-right: 20px;
`;

const SecondHalf = styled.div`
  flex: 0.45;
`;

const DialogTitleWrapper = styled(DialogTitle)`
  && .MuiTypography-root {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
