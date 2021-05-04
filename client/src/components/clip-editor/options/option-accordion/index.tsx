import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CheckboxWrapper from '../../../form-elements/checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GlobeIconWrapper from '../../../form-elements/globe-icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  children: React.ReactNode;
  canGlobal?: boolean;
  enabled: boolean;
  useGlobal: boolean;
  isGlobal: boolean;
  onEnable: () => void;
  onEnableGlobalOption: () => void;
  onUseAsGlobal: () => void;
  defaultExpanded?: boolean;
}
const OptionAccordion = (props: OwnProps): JSX.Element => {
  const {
    children,
    onEnable,
    enabled,
    canGlobal,
    useGlobal,
    onEnableGlobalOption,
    isGlobal,
    onUseAsGlobal,
    defaultExpanded,
  } = props;
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEnable = (e: Event) => {
    e.stopPropagation();
    onEnable();
  };

  const handleEnableGlobalOption = (e: Event) => {
    e.stopPropagation();
    onEnableGlobalOption();
  };

  return (
    <AccordionWrapper expanded={expanded} onChange={handleExpand} square>
      <AccordionSummaryWrapper
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <CheckboxWrapper
          onClick={handleEnable}
          onFocus={(event) => event.stopPropagation()}
          checked={enabled}
          accent={enabled ? 1 : 0}
        />
        <TypographyWrapper variant="h5">Label</TypographyWrapper>
        {expanded && canGlobal && (
          <CheckboxWrapper
            onClick={handleEnableGlobalOption}
            onFocus={(event) => event.stopPropagation()}
            accent={useGlobal ? 1 : 0}
            checked={useGlobal}
            disabled={!enabled}
          />
        )}
        {expanded && canGlobal && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onUseAsGlobal && onUseAsGlobal();
            }}
            onFocus={(event) => event.stopPropagation()}
            disabled={!enabled}
          >
            <GlobeIconWrapper accent={isGlobal ? 1 : 0} disabled={!enabled ? 1 : 0} />
          </IconButton>
        )}
      </AccordionSummaryWrapper>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionWrapper>
  );
};

export default OptionAccordion;

const AccordionWrapper = styled(Accordion)`
  &&& .MuiAccordion-root.MuiAccordion-expanded {
    margin: 0 0;
  }

  && {
    background-color: ${(props) => props.theme.colors.white05};
  }

  &&& .MuiAccordion-expanded {
    margin: 0 0;
  }

  &&&:before {
    background-color: ${(props) => props.theme.colors.white0};
  }
`;
const AccordionSummaryWrapper = styled(AccordionSummary)`
  && .MuiAccordionSummary-content {
    align-items: center;
  }
`;

const TypographyWrapper = styled(Typography)`
  && {
    flex: 1;
  }
`;
