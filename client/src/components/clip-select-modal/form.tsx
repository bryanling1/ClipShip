import ButtonWrapper from '../form-elements/button';
import Checkbox from '../form-elements/checkbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface OwnProps {
  onSearch: (
    search: string,
    limit: number,
    useGame: boolean,
    start: Date | undefined,
    end: Date | undefined
  ) => void;
  loading: boolean;
}

const ClipSelectForm = (props: OwnProps): JSX.Element => {
  const { onSearch, loading } = props;
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(50);
  const [more, setMore] = useState<boolean>(false);
  const [gameCheck, setGameCheck] = useState<boolean>(true);
  const [broadcasterCheck, setBroadcasterCheck] = useState<boolean>(false);
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search && limit) {
      onSearch(search, limit, gameCheck, start, end);
    }
  };

  const handleSearchGame = () => {
    setGameCheck(!gameCheck);
    setBroadcasterCheck(gameCheck);
  };

  const handleSearchBroadcaster = () => {
    setGameCheck(broadcasterCheck);
    setBroadcasterCheck(!broadcasterCheck);
  };

  const genDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
      date.getDate() + 1 < 10 ? '0' : ''
    }${date.getDate()}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => {
            setMore(!more);
          }}
        >
          {more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <TextFieldWrapper
          placeholder={gameCheck ? 'Game Title' : 'Broadcaster Name'}
          value={search}
          onChange={handleGameChange}
          variant="outlined"
          size="small"
          disabled={loading}
        />
        <TextFieldLimitWrapper
          type="number"
          value={limit}
          onChange={handleLimitChange}
          variant="outlined"
          size="small"
          disabled={loading}
        />
        <ButtonWrapper
          type="submit"
          disabled={loading}
          marginleft={5}
          height={40}
          startIcon={<SearchIcon />}
          padding={15}
        >
          Search
        </ButtonWrapper>
      </FormRow>
      <FormRow>
        <Collapse in={more}>
          <MoreOptionsWrapper>
            <FormRow>
              <Typography>Search by: </Typography>
              <Checkbox checked={gameCheck} onChange={handleSearchGame} accent={gameCheck} />
              <Typography>Game</Typography>
              <Checkbox
                checked={broadcasterCheck}
                onChange={handleSearchBroadcaster}
                accent={broadcasterCheck}
              />
              <Typography>Broadcaster</Typography>
            </FormRow>
            <FormRow>
              <Typography>Start:</Typography>
              <TextFieldWrapper
                type="date"
                variant="outlined"
                size="small"
                disabled={loading}
                defaultValue={genDateString(new Date())}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value) {
                    const year = parseInt(e.target.value.split('-')[0]);
                    const month = parseInt(e.target.value.split('-')[1]);
                    const day = parseInt(e.target.value.split('-')[2]);
                    setStart(new Date(`${month}/${day}/${year}`));
                  }
                }}
              />
              <Typography>End:</Typography>
              <TextFieldWrapper
                type="date"
                variant="outlined"
                size="small"
                disabled={loading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value) {
                    const year = parseInt(e.target.value.split('-')[0]);
                    const month = parseInt(e.target.value.split('-')[1]);
                    const day = parseInt(e.target.value.split('-')[2]);
                    setEnd(new Date(`${month}/${day}/${year}`));
                  }
                }}
              />
            </FormRow>
          </MoreOptionsWrapper>
        </Collapse>
      </FormRow>
    </form>
  );
};

export default ClipSelectForm;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

const TextFieldLimitWrapper = styled((otherProps) => <TextField {...otherProps} />)`
  && {
    width: 70px;
    margin-right: 5px;
    margin-left: 5px;
  }

  & div input {
    text-align: right;
  }
  && .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.primary};
  }
  && .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.primary};
  }

  && .MuiInputBase-root 
`;

const TextFieldWrapper = styled((otherProps) => <TextField {...otherProps} />)`
  && .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.primary};
  }
  && .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.primary};
  }

  && {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const MoreOptionsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white05};
  padding: 10px;
  border-radius: 10px;
`;
