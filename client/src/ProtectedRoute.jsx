import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = useSelector(state => state.user.user);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}