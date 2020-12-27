import { Fragment, useEffect, useState } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { API } from '../../config/api';
import InputForm from '../../components/atoms/inputForm/index';
import Home from '../../components/molecules/home/index';
import './home.css';
import Navbar from '../../components/molecules/navbar';
import Following from '../../components/molecules/following';
import TodaysPost from '../../components/molecules/todayPost/index';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [userFollow, setUserFollow] = useState([]);
  const [dropDown, setDropDown] = useState('All');
  let [search, setSearch] = useState({
    query: '',
  });

  const router = useHistory();

  //? Handle Dropdown
  const handleAll = () => {
    setDropDown('All');
  };
  const handleTodays = () => {
    setDropDown("Today's");
  };
  const handleFollow = () => {
    setDropDown('Following');
  };

  //? All Posts
  const fetchPost = async () => {
    try {
      const response = await API('/posts');

      const dataPost = response.data.data.posts;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : `http://localhost:8000/uploads/${dataPost[i].photos[0].image}`,
          width: 5,
          height: i % 2 == 0 ? 3 : 4,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setPosts(photo);
    } catch (err) {
      console.log(err);
    }
  };

  //? Following
  const fetchFollowing = async () => {
    try {
      const response = await API(`/follow`);

      const dataPost = response.data.data.following;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : `http://localhost:8000/uploads/${dataPost[i].photos[0].image}`,
          width: 5,
          height: i % 2 == 0 ? 3 : 4,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setUserFollow(photo);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickPosts = (e) => {
    const to = e.target.getAttribute('to');
    router.push(to);
  };

  const handleClickFollow = (e) => {
    const to = e.target.getAttribute('to');
    router.push(to);
  };

  const handleSearch = async (e) => {
    const { title } = search;
    let keyword = e.target.value;

    const body = JSON.stringify({ title: keyword });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await API.post('/search', body, config);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setSearch((search = keyword));
  };

  useEffect(() => {
    fetchPost();
    fetchFollowing();
  }, []);

  console.log(search);
  return (
    <Fragment>
      <Navbar />
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row justify-content-between'>
          <div className='col-3'>
            <Dropdown as={ButtonGroup}>
              <div className='dropdown-home'>
                <Button
                  style={{
                    color: '#000',
                    hover: 'none',
                  }}
                >
                  {dropDown}
                </Button>
                <Dropdown.Toggle
                  split
                  id='dropdown-split-basic'
                  style={{ color: '#000', hover: 'none' }}
                />
              </div>

              <Dropdown.Menu>
                <Dropdown.Item href='' onClick={handleAll}>
                  All
                </Dropdown.Item>
                <Dropdown.Item href='' onClick={handleTodays}>
                  Today's
                </Dropdown.Item>
                <Dropdown.Item href='' onClick={handleFollow}>
                  Following
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className='col-3 text-right'>
            <InputForm title={`Search`} onChange={(e) => handleSearch(e)} />
          </div>
        </div>
        {dropDown === 'All' ? (
          <div className='row mt-4'>
            <Home onClick={handleClickPosts} photos={posts} key={posts.id} />
          </div>
        ) : dropDown === 'Following' ? (
          <Following
            onClick={handleClickFollow}
            photos={userFollow}
            key={userFollow.id}
          />
        ) : dropDown === "Today's" ? (
          <TodaysPost />
        ) : null}
      </div>
    </Fragment>
  );
}
