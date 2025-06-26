import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DragonMaster from './screens/dragon-master';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DragonMaster />} />
        
      </Routes>
    </BrowserRouter>
  );
}