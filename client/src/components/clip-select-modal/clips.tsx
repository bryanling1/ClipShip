import { Clip } from '../../store/reducers/types';
import { getTotalTime } from '../../utils/timeline';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ClipCard from '../clip-card';
import Loader from '../loader';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  clips: Clip[];
  onAddClips: (clips: Clip[]) => void;
  loading: boolean;
}
const Clips = (props: OwnProps): JSX.Element => {
  const { clips, onAddClips, loading } = props;
  const [selected, setSelected] = useState(new Array(clips.length).fill(0));
  const [nSelected, setNSelected] = useState(0);

  useEffect(() => {
    setSelected(new Array(clips.length).fill(0));
  }, [JSON.stringify(clips)]);

  const handleSelect = (index: number) => {
    const temp = [...selected];
    temp[index] = selected[index] ? 0 : 3;
    selected[index] ? setNSelected(nSelected - 1) : setNSelected(nSelected + 1);
    setSelected(temp);
  };

  const handleAddClips = () => {
    const out = clips.filter((item, index) => selected[index]);
    if (nSelected) {
      onAddClips(out);
    }
  };

  return (
    <MainWrapper>
      <ClipsWrapper>
        <FlexWrapper>
          {loading && <Loader size={25} margintop={25} />}
          {clips.map((clip, i) => (
            <ClipCard
              imageurl={clip.thumbnailUrl}
              height={100}
              width={32}
              margin={2}
              onClick={() => {
                handleSelect(i);
              }}
              key={clip.id}
              border={selected[i]}
              cursor="pointer"
              opacity={selected[i] ? 1 : 0.7}
            />
          ))}
        </FlexWrapper>
      </ClipsWrapper>
      <AddClipsWrapper>
        {nSelected > 0 && (
          <AnchorTopLeft>
            <TypographyWrapper>
              {getTotalTime(clips.filter((item, index) => selected[index]))}
            </TypographyWrapper>
          </AnchorTopLeft>
        )}
        {nSelected > 0 && (
          <CenterText>
            <TypographyWrapper>{`${nSelected}/${clips.length} Selected`}</TypographyWrapper>
          </CenterText>
        )}
        {!nSelected && (
          <CenterText>
            <Typography>{`0 Selected`}</Typography>
          </CenterText>
        )}
        <ButtonWrapper
          variant="contained"
          disabled={nSelected > 0 ? false : true}
          startIcon={<AddIcon />}
          onClick={handleAddClips}
        >
          Add Clips
        </ButtonWrapper>
        <br />
      </AddClipsWrapper>
    </MainWrapper>
  );
};

export default Clips;

const FlexWrapper = styled.div`
   {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 2px;
  }
`;

const MainWrapper = styled.div`
   {
    width: 100%;
  }
`;

const ClipsWrapper = styled.div`
   {
    max-height: 500px;
    min-height: 500px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
`;

const CenterText = styled.div`
  width: 100%;
  text-align: center;
`;

const TypographyWrapper = styled(Typography)`
  color: rgb(136, 84, 208);
`;

export const ButtonWrapper = styled((otherProps) => <Button {...otherProps} />)`
   {
    background-color: rgb(136, 84, 208);
    color: white;
    margin: auto;
    display: flex;
    margin-left: ${(props) => (props.marginleft >= 0 ? `${props.marginleft}px` : 'auto')};
    height: ${(props) => (props.height ? `${props.height}px` : 'intial')};
    padding: ${(props) => (props.padding ? `${props.padding}px` : 'intial')};
  }
  &: hover {
    background-color: rgb(136, 84, 208);
  }
`;

const AddClipsWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const AnchorTopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
