import React from "react";
import { Message } from "semantic-ui-react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes("ERROR")) {
    return (
      <Message negative>
        <Message.Header>Error!</Message.Header>
        <p>{message}</p>
      </Message>
    );
  } else if (message.includes("changes")) {
    return (
      <Message>
        <Message.Header>Notification</Message.Header>
        <p>{message}</p>
      </Message>
    );
  } else {
    return (
      <Message positive>
        <Message.Header>Success!</Message.Header>
        <p>{message}</p>
      </Message>
    );
  }
};

export default Notification;
