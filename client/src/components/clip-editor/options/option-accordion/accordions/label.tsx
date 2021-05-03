import * as actions from '../../../../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { LabelPosition, StoreState } from '../../../../../store/reducers/types';
import CheckboxWrapper from '../../../../form-elements/checkbox';
import OptionAccordion from '../index';
import React from 'react';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  project: state.project,
  clips: state.clips,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const LabelOption = (props: Props): JSX.Element => {
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

  const labelPosition = selectedClip !== null ? clips[selectedClip].labelPosition : null;
  const enabled = selectedClip !== null && clips[selectedClip].label;
  const useGlobal = Boolean(selectedClip !== null && clips[selectedClip].labelGlobal);
  const labelGlobalPosition =
    selectedClip !== null ? clips[selectedClip].labelGlobalPosition : null;

  const handleSetLabel = () => {
    if (selectedClip !== null) {
      enableLabel(selectedClip, !clips[selectedClip].label);
    }
  };

  const handleEnableLabelGlobal = () => {
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

  const onSetLabelPosition = (position: LabelPosition) => {
    if (selectedClip !== null) {
      setLabelPosition(selectedClip, position);
    }
  };

  const isChecked = (position: LabelPosition) => {
    return labelPosition === position;
  };

  return (
    <OptionAccordion
      onEnable={handleSetLabel}
      enabled={enabled}
      useGlobal={Boolean(selectedClip !== null && clips[selectedClip].labelGlobal)}
      onEnableGlobalOption={handleEnableLabelGlobal}
      isGlobal={Boolean(
        selectedClip !== null &&
          clips[selectedClip].labelGlobal &&
          clips[selectedClip].labelGlobalPosition === clips[selectedClip].labelPosition
      )}
      onUseAsGlobal={handleSetAsGlobalLabel}
      canGlobal
      defaultExpanded
    >
      <PositionWrapper disabled={!enabled ? 1 : 0}>
        <PositionTop>
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.LEFT_TOP);
            }}
            checked={isChecked(LabelPosition.LEFT_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.LEFT_TOP ? 1 : 0}
            disabled={!enabled}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.CENTER_TOP);
            }}
            checked={isChecked(LabelPosition.CENTER_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.CENTER_TOP ? 1 : 0}
            disabled={!enabled}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.RIGHT_TOP);
            }}
            checked={isChecked(LabelPosition.RIGHT_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.RIGHT_TOP ? 1 : 0}
            disabled={!enabled}
          />
        </PositionTop>
        <PositionBottom>
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.LEFT_BOTTOM);
            }}
            checked={isChecked(LabelPosition.LEFT_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.LEFT_BOTTOM ? 1 : 0}
            disabled={!enabled}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.CENTER_BOTTOM);
            }}
            checked={isChecked(LabelPosition.CENTER_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.CENTER_BOTTOM ? 1 : 0}
            disabled={!enabled}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.RIGHT_BOTTOM);
            }}
            checked={isChecked(LabelPosition.RIGHT_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.RIGHT_BOTTOM ? 1 : 0}
            disabled={!enabled}
          />
        </PositionBottom>
        <PositionBottom></PositionBottom>
      </PositionWrapper>
    </OptionAccordion>
  );
};

export default connector(LabelOption);

interface PositionWrapperProps {
  disabled: number;
}

const PositionWrapper = styled.div<PositionWrapperProps>`
  width: 200px;
  height: 112.5px;
  background-color: ${(props) => props.theme.colors.white3};
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 3px;
`;

const PositionTop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PositionBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
