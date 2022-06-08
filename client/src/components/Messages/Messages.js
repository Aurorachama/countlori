import { message } from "antd";

export const SuccessMessage = (msg) => {
  message.success({
    content: msg,
    style: {
      position: 'fixed',
      top: '100px',
      right: '100px',
    }
  });
};
export const ErrorMessage = (msg) => {
  message.error({
    content: msg,
    style: {
      position: 'fixed',
      top: '100px',
      right: '100px',
    }
  });
};