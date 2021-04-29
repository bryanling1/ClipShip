import { LabelPosition } from '../../../store/reducers/types';
import Checkbox from '@material-ui/core/Checkbox';
import GlobeIcon from '@material-ui/icons/Public';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  onEnable: () => void;
  onGlobal: () => void;
  onEnableGlobal: () => void;
  label: boolean;
  useGlobal: boolean;
  isGlobal: boolean;
  labelPosition: LabelPosition | null;
  labelGlobalPosition: LabelPosition | null;
  onSetLabelPosition: (index: number) => void;
}
const LabelOption = (props: OwnProps): JSX.Element => {
  const {
    onEnable,
    onGlobal,
    onEnableGlobal,
    label,
    useGlobal,
    isGlobal,
    labelPosition,
    labelGlobalPosition,
    onSetLabelPosition,
  } = props;
  const isChecked = (position: LabelPosition) => {
    return labelPosition === position;
  };
  return (
    <MainWrapper>
      <Top>
        <CheckboxWrapper accent={label ? 1 : 0} checked={label} onClick={onEnable} />
        <TypographyWrapper variant="h5">Label</TypographyWrapper>
        <CheckboxWrapper
          accent={useGlobal ? 1 : 0}
          checked={useGlobal}
          onClick={onGlobal}
          disabled={!label}
        />
        <IconButton onClick={onEnableGlobal} disabled={!label}>
          <GlobeIconWrapper accent={isGlobal ? 1 : 0} disabled={!label ? 1 : 0} />
        </IconButton>
      </Top>
      <PositionWrapper disabled={!label ? 1 : 0}>
        <PositionTop>
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.LEFT_TOP);
            }}
            checked={isChecked(LabelPosition.LEFT_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.LEFT_TOP ? 1 : 0}
            disabled={!label}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.CENTER_TOP);
            }}
            checked={isChecked(LabelPosition.CENTER_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.CENTER_TOP ? 1 : 0}
            disabled={!label}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.RIGHT_TOP);
            }}
            checked={isChecked(LabelPosition.RIGHT_TOP)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.RIGHT_TOP ? 1 : 0}
            disabled={!label}
          />
        </PositionTop>
        <PositionBottom>
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.LEFT_BOTTOM);
            }}
            checked={isChecked(LabelPosition.LEFT_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.LEFT_BOTTOM ? 1 : 0}
            disabled={!label}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.CENTER_BOTTOM);
            }}
            checked={isChecked(LabelPosition.CENTER_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.CENTER_BOTTOM ? 1 : 0}
            disabled={!label}
          />
          <CheckboxWrapper
            onClick={() => {
              onSetLabelPosition(LabelPosition.RIGHT_BOTTOM);
            }}
            checked={isChecked(LabelPosition.RIGHT_BOTTOM)}
            accent={useGlobal && labelGlobalPosition === LabelPosition.RIGHT_BOTTOM ? 1 : 0}
            disabled={!label}
          />
        </PositionBottom>
        <PositionBottom></PositionBottom>
      </PositionWrapper>
    </MainWrapper>
  );
};

export default LabelOption;

const MainWrapper = styled.div`
  width: 100%;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const TypographyWrapper = styled(Typography)`
  flex: 1;
`;

interface PositionWrapperProps {
  disabled: number;
}

const PositionWrapper = styled.div<PositionWrapperProps>`
  width: 200px;
  height: 112.5px;
  background-color: ${(props) => props.theme.colors.white1};
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 3px;
  left: 43px;
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

const GlobeIconWrapper = styled((otherProps) => <GlobeIcon {...otherProps} />)`
  && {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  }
`;

const CheckboxWrapper = styled((otherProps) => <Checkbox {...otherProps} />)`
  && > .MuiIconButton-label > .MuiSvgIcon-root {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiIconButton-label:hover > .MuiSvgIcon-root:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&& .MuiCheckbox-colorSecondary {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  && > .MuiCheckbox-colorSecondary .Mui-checked:hover {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&& {
    fill: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
    color: ${(props) => (props.accent ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.35)')};
  }

  &&&&:hover {
    background-color: ${(props) =>
      props.accent ? props.theme.colors.primaryShadow : 'rgba(0, 0, 0, 0.05)'};
  }
`;
