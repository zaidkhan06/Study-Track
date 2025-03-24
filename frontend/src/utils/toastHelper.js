// utils/notify.js
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';

export const notifySuccess = (msg) => {
  toast(<CustomToast message={msg} type="success" />);
};

export const notifyError = (msg) => {
  toast(<CustomToast message={msg} type="error" />);
};

export const notifyInfo = (msg) => {
  toast(<CustomToast message={msg} type="info" />);
};
