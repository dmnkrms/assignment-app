import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return message.includes("ERROR") ? (
    <div className="error">{message}</div>
  ) : (
    <div className="message">{message}</div>
  );
};

export default Notification;