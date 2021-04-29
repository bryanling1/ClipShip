import * as actions from '../../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { LabelPosition } from '../../../store/reducers/types';
import { StoreState } from '../../../store/reducers/types';
import Label from './label';
import React from 'react';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  project: state.project,
  clips: state.clips,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Options = (props: Props): JSX.Element => {
  const {
    project,
    clips,
    enableLabel,
    setGlobalLabel,
    setGlobalLabelPosition,
    setLabelPosition,
    setAllGlobalLabelsOff,
  } = props;
  const { selectedClip } = project;
  const handleSetLabel = () => {
    if (selectedClip !== null) {
      enableLabel(selectedClip, !clips[selectedClip].label);
    }
  };
  const handleSetLabelGlobal = () => {
    if (selectedClip !== null) {
      setGlobalLabel(selectedClip, !clips[selectedClip].labelGlobal);
    }
  };

  const handleSetAsGlobalLabel = () => {
    if (selectedClip !== null) {
      if (
        clips[selectedClip].labelGlobal &&
        clips[selectedClip].labelGlobalPosition === clips[selectedClip].labelPosition
      ) {
        setAllGlobalLabelsOff();
      } else if (clips[selectedClip].labelPosition !== null) {
        setGlobalLabelPosition(selectedClip);
      }
    }
  };

  const handleSetLabelPosition = (position: LabelPosition) => {
    if (selectedClip !== null) {
      setLabelPosition(selectedClip, position);
    }
  };

  return (
    <MainWrapper>
      <Label
        onEnable={handleSetLabel}
        onGlobal={handleSetLabelGlobal}
        onEnableGlobal={handleSetAsGlobalLabel}
        label={selectedClip !== null && clips[selectedClip].label}
        useGlobal={Boolean(selectedClip !== null && clips[selectedClip].labelGlobal)}
        isGlobal={Boolean(
          selectedClip !== null &&
            clips[selectedClip].labelGlobal &&
            clips[selectedClip].labelGlobalPosition === clips[selectedClip].labelPosition
        )}
        labelPosition={selectedClip !== null ? clips[selectedClip].labelPosition : null}
        labelGlobalPosition={selectedClip !== null ? clips[selectedClip].labelGlobalPosition : null}
        onSetLabelPosition={handleSetLabelPosition}
      />
    </MainWrapper>
  );
};

export default connector(Options);

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white2};
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
`;
