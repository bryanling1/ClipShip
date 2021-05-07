[![LinkedIn][linkedin-shield]][linkedin-url]

# ClipShip

A Twitch Clip Compilation Editor

<img src="./demo.gif" width="100%">

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The ability to condense 24 hour live streams down to 10 minutes can never go unappreciated and is often seen as Twitch Clip compilations on Youtube. Clip ship aims to assist creators in the searching and downloading of clips so they can spend more mastering their craft in the form of editing.

### Built With

* React
* Typescript
* Express
* Ffmpeg
* MongoDB
* docker
* Material UI


<!-- GETTING STARTED -->
## Getting Started

Clip ship is a full stack application meant to be run locally.

### Prerequisites

* npm
* Docker with `docker-compose`

### Installation

1. Get a Twitch API Key: [Twitch Dev Console](https://dev.twitch.tv/console/apps)
2. Clone the repo
   ```sh
   git clone https://github.com/bryanling1/ClipShip.git
   ```
3. Add API `CLIENT_ID` and `CLIENT_SECRET` from **Step 1** to `./docker-compose` environment variables
```yml
back:
    ...
    environment:
        - CLIENT_ID=<Your ClientId>
        - CLIENT_SECTRET=<Your Secret>
 ```
4 Startup `Docker` and run `docker-compose up`



<!-- USAGE EXAMPLES -->
## Usage

### Known errors
If you are experiencing issues with downloading a reliable fix is to **exit docker** and clear the `server/src/temps` folder.


<!-- ROADMAP -->
## Roadmap

Features scheduled in the future/being currently developed include:

1. Add job scheduling for multiple download/client disconnects
2. The ability to crop and duplicate clips
3. External asset uploads






[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bryanling