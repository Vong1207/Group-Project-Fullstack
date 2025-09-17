/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Tran Gia Vong
// # ID: 4012094 */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = useSelector(state => state.user.user);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}