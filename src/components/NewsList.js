import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  // 마운트 될 때만 실행한다 (useEffect() Hook에는 async를 사용하면 안된다.)
  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c61972b9dc2d4f44af259b559b797025`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading();
    };
    fetchData();
  }, [category]);
  // 마운트 될 때만 실행한다.

  if (loading) {
    return <NewsListBlock>대기중 ...</NewsListBlock>;
  }

  if (!articles) {
    return null;
  }
  // map 함수를 사용하기 전에 꼭 !articles를 조회해서 해당 값이 null이 아닌지 검사해야 한다.

  return (
    <NewsListBlock>
      {articles.map((article) => {
        return <NewsItem key={article.url} article={article} />;
      })}
    </NewsListBlock>
  );
};

export default NewsList;
