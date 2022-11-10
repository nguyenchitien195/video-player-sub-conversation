import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

interface IPrivateRouterProps {
  children: React.ReactElement;
}

export default function PrivateRouter({ children }: IPrivateRouterProps) {
  const authCookie = Cookies.get('auth');

  if (!authCookie) {
    return <Navigate to="/login" />;
  }

  return children;
}
