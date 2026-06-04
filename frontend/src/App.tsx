import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import LikedView from './views/LikedView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/liked" element={<LikedView />} />
    </Routes>
  );
}
