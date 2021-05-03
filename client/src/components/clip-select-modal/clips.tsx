import { Clip } from '../../store/reducers/types';
import { getTotalTime } from '../../utils/timeline';
import AddIcon from '@material-ui/icons/Add';
import ButtonWrapper from '../form-elements/button';
import ClipCard from '../clip-card';
import Loader from '../loader';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  clips: Clip[];
  onAddClips: (clips: Clip[]) => void;
  onClick: (index: number) => void;
  loading: boolean;
  selectedIndex: number;
}
const Clips = (props: OwnProps): JSX.Element => {
  const { clips, onAddClips, loading, onClick, selectedIndex } = props;
  const [selected, setSelected] = useState(new Array(clips.length).fill(0));
  const [nSelected, setNSelected] = useState(0);

  const handleSelect = (index: number) => {
    if (index !== selectedIndex) {
      return;
    }
    const temp = [...selected];
    temp[index] = selected[index] ? 0 : 7;
    selected[index] ? setNSelected(nSelected - 1) : setNSelected(nSelected + 1);
    setSelected(temp);
  };

  const handleAddClips = () => {
    const out = clips.filter((item, index) => selected[index]);
    if (nSelected) {
      onAddClips(out);
    }
  };

  useEffect(() => {
    if (clips.length === 0) {
      setSelected([]);
      setNSelected(0);
    }
  }, [JSON.stringify(clips)]);

  return (
    <MainWrapper>
      <ClipsWrapper>
        <FlexWrapper>
          {loading && <Loader size={25} margintop={25} />}
          {clips.map((clip, i) => (
            <ClipCard
              imageurl={clip.thumbnailUrl}
              height={180}
              width={48}
              margin={3}
              onClick={() => {
                handleSelect(i);
                onClick(i);
              }}
              key={i}
              border={i === selectedIndex ? 6 : 0}
              cursor="pointer"
              opacity={1}
              trimmed={clip.end - clip.start !== clip.duration}
              marginBottom="6px"
              selected={selected[i]}
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
            <TypographyWrapper>{`${nSelected} / ${clips.length} Selected`}</TypographyWrapper>
          </CenterText>
        )}
        {!nSelected && clips.length > 0 && (
          <CenterText>
            <Typography>{`0 / ${clips.length} Selected`}</Typography>
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
    margin-bottom: 20px;
  }
`;

const CenterText = styled.div`
  width: 100%;
  text-align: center;
`;

const TypographyWrapper = styled(Typography)`
  color: rgb(136, 84, 208);
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
