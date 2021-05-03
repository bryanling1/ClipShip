import * as actions from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../store/reducers/types';
import { getMinutes } from '../../utils/timeline';
import DownloadButton from '../form-elements/button';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FileDownload from 'js-file-download';
import Loader from '../loader';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';

const mapStateToProps = (state: StoreState) => ({
  clips: state.clips,
  project: state.project,
});
const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Download = (props: Props): JSX.Element => {
  const { clips, project } = props;
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleDownload = async () => {
    if (clips.length > 0 && project.name && project.id && !isDownloading) {
      const minutes = getMinutes(clips);
      const ESTIMATE_MINUTES = Math.floor((20 / 6) * minutes);
      setTimeLeft(ESTIMATE_MINUTES);
      let count = 0;
      const ESTIMATE_INTERVAL = setInterval(() => {
        setTimeLeft(ESTIMATE_MINUTES - count);
        count++;
      }, 60 * 1000);
      setIsDownloading(true);
      const result = await axios({
        url: `http://localhost:5000/download?clips=${clips}`,
        method: 'POST',
        responseType: 'blob',
        data: {
          id: project.id,
          clips: clips,
        },
      }).catch((err) => {
        console.log(err);
      });
      if (result) {
        FileDownload(result.data, `${project.name.split(' ').join('-')}.mp4`);
        setIsDownloading(false);
        clearInterval(ESTIMATE_INTERVAL);
      }
    }
  };

  const timeLeftString = timeLeft >= 1 ? `${timeLeft} mins` : '< 1 min';
  return (
    <MainWrapper>
      <DownloadButton
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        Download
      </DownloadButton>
      <br />
      {isDownloading && <Loader />}
      <br />
      {isDownloading && <TypographyWrapper>Est. time left: {timeLeftString}</TypographyWrapper>}
    </MainWrapper>
  );
};

export default connector(Download);

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TypographyWrapper = styled(Typography)`
  text-align: center;
  color: white;
`;
