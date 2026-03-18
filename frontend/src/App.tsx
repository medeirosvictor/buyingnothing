import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage, ItemsPage, DonationsPage, NotFoundPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
