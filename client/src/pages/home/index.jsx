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
import Loading from '../../components/atoms/loading';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [userFollow, setUserFollow] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [todays, setTodays] = useState([]);
  const [text, setText] = useState([]);
  const [dropDown, setDropDown] = useState('All');
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const response = await API(`/posts`);

      const dataPost = response.data.data.posts;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : dataPost[i].photos[0].image,
          width: i % 2 == 0 ? 4 : 6,
          height: i % 2 == 1 ? 4 : 3,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setPosts(photo);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //? Following
  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const response = await API(`/follow`);
      const dataPost = response.data.data.following;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : dataPost[i].photos[0].image,
          width: i % 2 == 0 ? 4 : 4,
          height: i % 2 == 1 ? 4 : 2,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setUserFollow(photo);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //? Todays
  const fetchTodays = async () => {
    try {
      const response = await API('/posts');

      const dataPost = response.data.data.posts;

      const filterData = dataPost.filter(
        (data) =>
          Date.now() - new Date(data.createdAt).getTime() < 24 * 60 * 60 * 1000
      );

      //? init array
      let photo = [];
      for (let i = 0; i < filterData.length; i++) {
        photo[i] = {
          src:
            filterData[i].photos.length === 0
              ? null
              : filterData[i].photos[0].image,
          width: 5,
          height: i % 2 == 0 ? 3 : 4,
          to: `/detail-post/${filterData[i].id}`,
          id: filterData[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setTodays(photo);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePosts = (e) => {
    const to = e.target.getAttribute('to');
    router.push(to);
  };

  const handleSearch = async (e) => {
    let keyword = e.target.value;

    const body = JSON.stringify({ title: keyword });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await API.post('/search', body, config);

      if (response.data.status === 'Request failed') {
        setDataFilter([]);
      }
      const dataPost = response.data.data.posts;

      // //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : dataPost[i].photos[0].image,
          width: 4,
          height: 2,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }

      photo.sort((a, b) => b.id - a.id);
      setDataFilter(photo);
      setText(dataPost);
    } catch (err) {
      console.log(err);
    }

    setSearch((search = keyword));
  };

  useEffect(() => {
    fetchFollowing();
    fetchPost();
    fetchTodays();
  }, []);

  console.log(text);
  return loading ? (
    <Loading />
  ) : (
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
            <InputForm title={`Search`} onChange={handleSearch} />
          </div>
        </div>
        {dropDown === 'All' ? (
          <div className='mt-4'>
            {loading ? (
              ''
            ) : search.length == null ? (
              <Home onClick={handlePosts} photos={posts} key={posts.id} />
            ) : (
              <Home
                onClick={handlePosts}
                photos={dataFilter}
                key={dataFilter.id}
              />
            )}
          </div>
        ) : dropDown === 'Following' ? (
          <div className='mt-4'>
            {search.length == null ? (
              <Following
                onClick={handlePosts}
                photos={userFollow}
                key={userFollow.id}
              />
            ) : (
              <Following
                onClick={handlePosts}
                photos={dataFilter}
                key={dataFilter.id}
              />
            )}
          </div>
        ) : dropDown === "Today's" ? (
          <div className='mt-4'>
            {search.length == null ? (
              <TodaysPost
                onClick={handlePosts}
                photos={todays}
                key={todays.id}
              />
            ) : (
              <TodaysPost
                onClick={handlePosts}
                photos={dataFilter}
                key={dataFilter.id}
              />
            )}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}
