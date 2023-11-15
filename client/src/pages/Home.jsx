import React from 'react'
import TwitterBox from '../components/TwitterBox';
import TwitterPostBox from '../components/TwitterPostBox';

const Home = () => {
  return (
    <div className="Home">
      <div className='p-4'>
        <TwitterPostBox />
      </div>
      <TwitterBox
        avatarSrc="https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png"
        username="user123"
        displayName="Alice"
        content="Just tweeted something interesting! #React"
      />
      <TwitterBox
        avatarSrc="avatar2.png"
        username="dev456"
        displayName="Bob"
        content="Excited to share my latest project. #CodingLife"
      />
    </div>
  );
}

export default Home
