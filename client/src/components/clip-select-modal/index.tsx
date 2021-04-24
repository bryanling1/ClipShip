import * as actions from '../../store/actions';
import { Clip } from '../../store/reducers/types';
import { ConnectedProps, connect } from 'react-redux';
import Clips from './clips';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from './form';
import React, { useState } from 'react';
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
  const handleAddClips = (clips: Clip[]) => {
    if (clips.length > 0) {
      onClose();
      addClips(clips);
    }
  };
  const handleSearch = async (game: string, limit: number) => {
    setLoading(true);
    console.log(game, limit);
    const result = await axios.get<Clip[]>('http://localhost:3000/search');
    if (result) {
      setClips(result.data);
      setLoading(false);
    }
  };
  return (
    <DialogWrapper open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Find and Add Clips</DialogTitle>
      <DialogContent>
        <FlexWrapper>
          <FirstHalf>
            <Form onSearch={handleSearch} loading={loading} />
            <Clips clips={clips} onAddClips={handleAddClips} loading={loading} />
          </FirstHalf>
          <SecondHalf></SecondHalf>
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
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const FirstHalf = styled.div`
  flex: 0.6;
`;

const SecondHalf = styled.div`
  flex: 0.4;
`;
