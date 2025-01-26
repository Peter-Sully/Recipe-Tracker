// Updated App.js

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Article from './components/Article';
import Pagination from './components/Pagination';
import './App.css';

const getArticles = async (url, num, setArticlesData) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Handle errors in fetching articles
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    // If there are less than num articles, fill the array with placeholder articles
    const results = data.results.slice(0, num);
    const placeholderArticles = new Array(num - results.length).fill({
      title: 'Article not available',
      abstract: 'There was an error fetching this article. Please try again later.',
      media: [{ 'media-metadata': [{ url: 'placeholder-image.jpg' }] }],
    });

    setArticlesData([...results, ...placeholderArticles]);
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Display empty articles if there's an error
    const placeholderArticles = new Array(num).fill({
      title: 'Article not available',
      abstract: 'There was an error fetching articles. Please try again later.',
      media: [{ 'media-metadata': [{ url: 'placeholder-image.jpg' }] }],
    });
    setArticlesData(placeholderArticles);
  }
};

function App() {
  const [title, setTitle] = useState('Lab 5 NYT Article Thing');
  const [articlesData, setArticlesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [search, setSearch] = useState({ num: 6, sort: 'Viewed', time: 'Day' });
  const apikey = 'Wu6bpx2ra00MzL5pR4T7YObDk6NNepxz';

  useEffect(() => {
    setTitle(`Most ${search.sort} - ${search.time}`);
    let urlTime = '';
    switch (search.time) {
      case 'Day':
        urlTime = 1;
        break;
      case 'Week':
        urlTime = 7;
        break;
      case 'Month':
        urlTime = 30;
        break;
      default:
        console.log('Something is very wrong! Unexpected value in time');
    }
    let url = `https://api.nytimes.com/svc/mostpopular/v2/${search.sort.toLowerCase()}/${urlTime}.json?api-key=${apikey}`;
    getArticles(url, search.num, setArticlesData);
  }, [search]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesData.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Rater</h1>
      </header>
      <div className="main-content">
        <div className="left-section">
          <Sidebar setSearch={setSearch} />
        </div>
        <div className="right-section">
          {currentArticles.map((article, i) => (
            <Article
              key={i}
              artNum={(currentPage - 1) * articlesPerPage + i + 1}
              artTitle={article.title}
              artDate={article.published_date}
              artImg={article.media && article.media[0]?.['media-metadata']?.[1]?.url}
              artCaption={article.media && article.media[0]?.caption}
              artDesc={article.abstract}
            />
          ))}
        </div>
      </div>
      <div className="bottom-section">
        <Pagination articlesPerPage={articlesPerPage} totalArticles={articlesData.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
