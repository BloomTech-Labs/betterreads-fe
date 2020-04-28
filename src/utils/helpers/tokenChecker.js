import jwt from 'jwt-decode';
import store from '../store';
import { preserveState } from '../../store/actions/authenticationActions';

// Check to validate token and make sure it is not expired
// This also mitigates the issue of losing state on reload
export const validateToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt(token);
    const exp = decoded.exp;
    const expConverted = new Date(exp * 1000);
    const current = new Date();
    if (current < expConverted) {
      // If the token exists && is not expired rebuild state
      store.dispatch(preserveState(token));
    } else {
      // Else remove the token from localStorage to force the user back to landing
    }
  }
};
