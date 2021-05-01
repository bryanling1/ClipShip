import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  url?: string;
  start?: number;
  end?: number;
  length?: number;
  title?: string;
  broadcaster?: string;
  height?: number;
  onStartEndChange: (start: number, end: number) => void;
}
const Player = (props: OwnProps): JSX.Element => {
  const { url, start, end, length, onStartEndChange, height } = props;
  const [value, setValue] = useState<number[]>([start || 0, end || 0]);
  const handleChange = (event: any, newValue: number | number[]) => {
    const newVal = newValue as number[];
    setValue(newVal);
  };

  const handleEndDragging = () => {
    onStartEndChange(value[0], value[1]);
  };

  useEffect(() => {
    if (start !== undefined && end !== undefined && (start !== value[0] || end !== value[1])) {
      setValue([start, end]);
    }
  }, [start, end]);

  return (
    <MainWrapper>
      {url && (
        <iframe
          src={`${url}&parent=localhost&autoplay=true`}
          width="100%"
          height={`${height ? `${height}px` : '300px'}`}
          frameBorder="0"
          scrolling="no"
        />
      )}
      {!url && (
        <NoClip>
          <Typography>No Clip Selected</Typography>
        </NoClip>
      )}
      {start !== undefined && end !== undefined && length !== undefined && (
        <SliderContainer>
          <SliderWrapper
            value={[value[0], value[1]]}
            max={length}
            onChange={handleChange}
            step={0.01}
            onMouseUp={handleEndDragging}
            onMouseLeave={handleEndDragging}
          />
        </SliderContainer>
      )}

      {!start && !end && !length && <SliderWrapper value={[25, 75]} />}
    </MainWrapper>
  );
};

export default Player;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const NoClip = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 20px;
  box-sizing: border-box;
`;
const SliderWrapper = styled(Slider)`
  && .MuiSlider-rail {
    height: 10px;
    background-color: ${(props) => props.theme.colors.white2};
    opacity: 1;
  }

  && .MuiSlider-active {
    box-shadow: 0px 0px 0px 10px ${(props) => props.theme.colors.primaryShadow};
  }

  && .MuiSlider-track {
    height: 10px;
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  && .MuiSlider-thumb {
    height: 20px;
    width: 20px;
    background-color: ${(props) => props.theme.colors.primary};
  }

  && .MuiSlider-thumb:hover {
    box-shadow: 0px 0px 0px 7px ${(props) => props.theme.colors.primaryShadow};
  }
`;
