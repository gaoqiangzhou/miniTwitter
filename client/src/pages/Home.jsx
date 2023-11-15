import React from 'react'
import TwitterList from '../components/TwitterList';
import TwitterPostBox from '../components/TwitterPostBox';
import TwitterBox from '../components/TwitterBox';

const Home = () => {
  const posts = [{"displayName": "asdas", "content": "first"}, {"displayName": "asdas", "content": "second"}]
  return (
    <div className="Home">
      <div className='p-4'>
        <TwitterPostBox />
      </div>

      <TwitterList/>
    </div>
  );
}

export default Home
