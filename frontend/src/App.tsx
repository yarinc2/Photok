import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
}
