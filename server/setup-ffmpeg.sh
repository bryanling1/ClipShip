#!/usr/bin/env bash
echo 'deb http://www.deb-multimedia.org jessie main non-free' >> /etc/apt/sources.list
echo 'deb-src http://www.deb-multimedia.org jessie main non-free' >> /etc/apt/sources.list
apt-get update
apt-get install -y --force-yes deb-multimedia-keyring
apt-get remove -y --force-yes ffmpeg
apt-get install -y --force-yes build-essential libmp3lame-dev libvorbis-dev libtheora-dev libspeex-dev yasm pkg-config libx264-dev libav-tools libfreetype6-dev ffmpeg