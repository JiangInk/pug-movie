import wepy from 'wepy';
const basicUrl = 'https://api.douban.com/v2/movie';

// http请求接口
const apiRequest = async (url, method = 'GET', data = {}) => {
  const options = {
    url,
    method,
    data,
    header: {
      'Content-Type': 'json'
    }
  };

  wepy.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 10000,
    mask: true
  });

  let res = await wepy.request(options);

  if (res.statusCode === 200) {
    wepy.hideToast();
    return res.data;
  }
};

// 获取正在上映的电影列表
const getShowingMovieList = async data => {
  let url = `${basicUrl}/in_theaters`;
  data = data || {
    city: '成都'
  };
  return await apiRequest(url, 'GET', data);
};

// 获取即将上映的电影列表
const getComingMovieList = async data => {
  let url = `${basicUrl}/coming_soon`;
  data = data || {
    start: 0,
    count: 20
  };
  return await apiRequest(url, 'GET', data);
};

// 获取Top250电影列表
const getTopMovieList = async data => {
  let url = `${basicUrl}/top250`;
  data = data || {
    start: 0,
    count: 10
  };
  return await apiRequest(url, 'GET', data);
};

// 北美票房榜
const getUsMovieList = async (data = {}) => {
  let url = `${basicUrl}/us_box`;
  return await apiRequest(url, 'GET', data);
};

// 电影条目信息
const getMovieSubject = async subjectId => {
  let url = `${basicUrl}/subject/${subjectId}`;
  return await apiRequest(url, 'GET');
};

// 影人条目信息
const getMovieCelebrity = async celebrityId => {
  let url = `${basicUrl}/celebrity/${celebrityId}`;
  return await apiRequest(url, 'GET');
};

// 电影条目搜索
const getMovieSearch = async data => {
  let url = `${basicUrl}/search`;
  data = data || {
    q: '关键字',
    tag: '关联标签',
    start: 0,
    count: 20
  };
  return await apiRequest(url, 'GET', data);
};

module.exports = {
  getShowingMovieList,
  getComingMovieList,
  getTopMovieList,
  getUsMovieList,
  getMovieSubject,
  getMovieCelebrity,
  getMovieSearch
};
