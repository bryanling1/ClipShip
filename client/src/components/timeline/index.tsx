import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { StoreState } from '../../store/reducers/types';
import { getClipWidths, getTotalTime } from '../../utils/timeline';
import AddIcon from '@material-ui/icons/Add';
import ClipCard from '../clip-card';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  project: state.project,
  clips: state.clips,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  onAdd: () => void;
}

type Props = PropsFromRedux & OwnProps;

const Timeline = (props: Props): JSX.Element => {
  const { clips, moveClip, project, setSelectedClip, onAdd } = props;
  const { selectedClip } = project;
  const widths = getClipWidths(clips);
  const getItemStyle = (width, isDragging, index, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    borderColor: '#8854d0',
    borderStyle: 'solid',
    borderWidth: index === selectedClip ? 4 : 0,
    opacity: isDragging || index === selectedClip ? 1 : 0.5,
    width: `${width * 100}%`,
    borderRadius: 9,
    ...draggableStyle,
    margin: 2,
  });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.index !== result.destination.index) {
      moveClip(result.source.index, result.destination.index);
      setSelectedClip(result.destination.index);
    }
  };

  return (
    <>
      <PaperWrapper elevation={0}>
        <FabWrapper aria-label="add" onClick={onAdd} disabled={!project.name}>
          <AddIcon />
        </FabWrapper>
        {project.name && clips.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <FlexWrapper ref={provided.innerRef} {...provided.droppableProps}>
                  {clips.map((item, index) => (
                    <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            widths[index],
                            snapshot.isDragging,
                            index,
                            provided.draggableProps.style
                          )}
                          onMouseDown={() => {
                            setSelectedClip(index);
                          }}
                        >
                          <ClipCard
                            imageurl={item.thumbnailUrl}
                            labeled={item.label}
                            labeledGlobal={item.labelGlobal}
                            trimmed={item.end - item.start !== item.length}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </FlexWrapper>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </PaperWrapper>
      {project.name && clips.length > 0 && <Typography>{getTotalTime(clips)}</Typography>}
    </>
  );
};

export default connector(Timeline);

const PaperWrapper = styled(Paper)`
  && {
    background-color: #f5f5f5;
    width: 100%;
    display: flex;
    padding: 5px;
    height: 134px;
    position: relative;
    align-items: center;
    justify-content: center;
  }
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`;

const FabWrapper = styled(Fab)`
  && {
    position: absolute;
    margin-right: -28px;
    right: 0;
    top: 44px;
    z-index: 2;
    background-color: rgb(136, 84, 208);
    color: white;
  }
  &&: hover {
    background-color: rgb(136, 84, 208);
  }
`;
