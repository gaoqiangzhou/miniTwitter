import React from 'react'
import TwitterList from '../components/TwitterList';
import TwitterPostBox from '../components/TwitterPostBox';
import TwitterBox from '../components/TwitterBox';

const Home = () => {
  const posts = [{"displayName": "asdas", "content": "first"}, {"displayName": "asdas", "content": "second"}]
  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold mt-16 ">Home</h1>
      <div className='p-4'>
        <TwitterPostBox />
      </div>

      <TwitterList/>
    </div>
  );
}

export default Home
