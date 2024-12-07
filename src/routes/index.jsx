import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/HomeLayout';
import Overview from '../pages/dashboard/Overview';
import Analytics from '../pages/dashboard/Analytics';
import Reports from '../pages/dashboard/Reports';
import UserList from '../pages/users/UserList';
import UserProfile from '../pages/users/UserProfile';
import Settings from '../pages/settings/Settings';
import HomeLayout from '../layout/HomeLayout';
import LoginPage from '../pages/auth/Login';
import BlogsLayout from '../pages/blogs/BlogsLayout';
import TestimonialLayout from '../pages/testimonials/TestimonialLayout';
import SocialMediaLayout from '../pages/socialmedia/SocialMediaLayout';


export const router = createBrowserRouter([
   {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index:true, element: <Overview /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'reports', element: <Reports /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/:id', element: <UserProfile /> },
      { path: 'settings', element: <Settings /> },
      { path: '/posts', element: <BlogsLayout /> },
      { path: '/testimonials', element: <TestimonialLayout /> },
      { path: '/social', element: <SocialMediaLayout /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPassword />,
  // },
]);