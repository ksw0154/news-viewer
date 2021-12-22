import { Routes, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path=":category" element={<NewsPage />} />
        <Route path="" element={<NewsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
