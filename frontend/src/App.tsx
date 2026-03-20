import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage, DonationsPage, ProfilePage, ContactPage, AboutPage, NotFoundPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
