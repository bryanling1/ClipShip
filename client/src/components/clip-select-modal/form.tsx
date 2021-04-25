import ButtonWrapper from '../button';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

interface OwnProps {
  onSearch: (game: string, limit: number) => void;
  loading: boolean;
}

const ClipSelectForm = (props: OwnProps): JSX.Element => {
  const { onSearch, loading } = props;
  const [game, setGame] = useState<string>('');
  const [limit, setLimit] = useState<number>(50);

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (game && limit) {
      onSearch(game, limit);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TextField
        placeholder="Game Title"
        value={game}
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
        marginleft={0}
        height={40}
        startIcon={<SearchIcon />}
        padding={15}
      >
        Search
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ClipSelectForm;

const FormWrapper = styled.form`
  display: flex;
`;

const TextFieldLimitWrapper = styled(TextField)`
  && {
    width: 70px;
    margin-right: 5px;
    margin-left: 5px;
  }

  & div input {
    text-align: right;
  }
`;
