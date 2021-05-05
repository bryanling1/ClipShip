import * as actions from '../../../store/actions';
import { ConnectedProps, connect } from 'react-redux';
import { StoreState } from '../../../store/reducers/types';
import { getMinutes } from '../../../utils/timeline';
import DownloadButton from '../../form-elements/button';
import DownloadIcon from '@material-ui/icons/GetApp';
import FileDownload from 'js-file-download';
import Loader from '../../loader';
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
  const [video, setVideo] = useState<boolean>(false);

  const handleDownloadConcat = async () => {
    setVideo(true);
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

  const handleDownloadSeperate = async () => {
    setVideo(false);
    if (clips.length > 0 && project.name && project.id && !isDownloading) {
      const minutes = getMinutes(clips);
      const ESTIMATE_MINUTES = Math.floor((14 / 6) * minutes);
      setTimeLeft(ESTIMATE_MINUTES);
      let count = 0;
      const ESTIMATE_INTERVAL = setInterval(() => {
        setTimeLeft(ESTIMATE_MINUTES - count);
        count++;
      }, 60 * 1000);
      setIsDownloading(true);
      const result = await axios
        .post(
          `http://localhost:5000/download`,
          {
            id: project.id,
            clips: clips,
            seperate: true,
          },
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .catch((err) => {
          console.log(err);
        });
      if (result) {
        // FileDownload(result.data, `${project.name.split(' ').join('-')}.zip`);
        const blob = new Blob([result.data], { type: 'application/zip' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${project.name.split(' ').join('-')}.zip`;
        document.body.appendChild(a);
        a.click();
        setIsDownloading(false);
        clearInterval(ESTIMATE_INTERVAL);
      }
    }
  };

  const timeLeftString = timeLeft >= 1 ? `${timeLeft} mins` : '< 1 min';
  return (
    <MainWrapper>
      {!isDownloading && (
        <>
          <TypographyWrapperBold>Download</TypographyWrapperBold>
          <FlexMargin />
          <DownloadButton
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadConcat}
            disabled={isDownloading}
          >
            Video
          </DownloadButton>
          <FlexMargin />
          <DownloadButton
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadSeperate}
            disabled={isDownloading}
          >
            Seperate Clips
          </DownloadButton>
        </>
      )}
      {isDownloading && (
        <>
          <TypographyWrapperBold>Downloading {video ? 'Video' : 'Clips'}</TypographyWrapperBold>
          <FlexMargin />
          <Loader />
          <FlexMargin />
          <TypographyWrapper>Est. time left: {timeLeftString}</TypographyWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default connector(Download);

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TypographyWrapper = styled(Typography)`
  text-align: center;
  color: white;
`;

const FlexMargin = styled.div`
  width: 100%;
  height: 10px;
`;

const TypographyWrapperBold = styled(Typography)`
  && {
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;
