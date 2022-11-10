import { Routes, Route } from 'react-router-dom';
import UserLayout from '~/layouts/UserLayout';
import Home from '~/pages/Home';
import Page404 from '~/pages/Page404';
import Video from '~/pages/Video';

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />
      <Route
        path="/videos/:id"
        element={
          <UserLayout>
            <Video />
          </UserLayout>
        }
      />
      <Route
        path="/*"
        element={
          <UserLayout>
            <Page404 />
          </UserLayout>
        }
      />
    </Routes>
  );
}
