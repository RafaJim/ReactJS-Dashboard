import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CreateReview from './modules/CreateReview';
import ShowReviews from './modules/ShowReviews';
import ShowAllReviews from './modules/ShowAllReviews';
import GuardedRoute from './modules/GuardedRoute';
import Login from './modules/Login';

function App() {
  const [isAutheticated, setIsAutheticated] = useState(localStorage.getItem('token'));

  const auth = () => {
    const token = localStorage.getItem('token');
    setIsAutheticated(token);
  }

  // setTimeout(() => localStorage.clear, 10000);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login auth={ auth }/> } exact />
        <Route element={<GuardedRoute isAutheticated={ isAutheticated } />}>
          <Route path="/showAllReviews" element={ <ShowAllReviews/> } />
          <Route path="/showReviews" element={ <ShowReviews/> } />
          <Route path="/createReview" element={ <CreateReview/> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
