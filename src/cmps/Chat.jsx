import React, { useRef, useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import { socketService } from '../services/socketService';
import { useEffect } from 'react/cjs/react.development';
import { useSelector } from 'react-redux';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

const INITIAL_STATE = {
  currMessage: { txt: '' },
  messages: socketService.getMsgsFromStorage() || [],
  typingUser: {
    username: '',
    isTyping: false,
  },
};

export const Chat = ({ toy, onClose, isOpen }) => {
  const { user } = useSelector((state) => state.userModule);

  const [currMessage, setCurrMessage] = useState(INITIAL_STATE.currMessage);
  const [messages, setMessages] = useState(INITIAL_STATE.messages);
  const [typingUser, setTypingUser] = useState(INITIAL_STATE.typingUser);
  const [topic, setTopic] = useState(toy);
  const [isBotMode, toggleBotMode] = useToggle(false);

  const botModeIntervalId = useRef();

  useEffect(() => {
    socketService.setup();
    socketService.emit('chat topic', toy);
    socketService.on('chat addMsg', addMessage);
    socketService.on('userTyping', onUserTyping);
    return () => {
      socketService.off('chat addMsg', addMessage);
      socketService.off('userTyping', onUserTyping);
      socketService.terminate();
      clearTimeout(botModeIntervalId.current);
    };
  }, []);

  useUpdateEffect(() => {
    setTopic(toy._id);
    socketService.emit('chat topic', toy._id);
  }, [toy._id]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const onUserTyping = ({ username, msg }) => {
    setTypingUser({
      currTypingUser: { username, isTyping: Boolean(msg) },
    });
  };

  const sendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    botModeIntervalId.current && clearTimeout(botModeIntervalId);
    botModeIntervalId.current = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: 'Bot', txt: 'You are amazing!' },
      ]);
    }, 1500);
  };

  const changeTopic = () => {
    socketService.emit('chat topic', topic);
  };

  const sendMsg = (ev) => {
    ev.preventDefault();
    const from = user?.fullname || user?.username || 'Me';
    socketService.emit('chat newMsg', { from, txt: currMessage.txt });
    setCurrMessage(INITIAL_STATE.currMessage);
    if (isBotMode) sendBotResponse();
  };

  const handleMessageChange = async (ev) => {
    const { name, value } = ev.target;
    const typingUser = {
      username: user?.fullname || user?.username || 'guest',
      msg: value,
    };
    socketService.emit('typing', typingUser);

    setCurrMessage((prevMessage) => ({ ...prevMessage, [name]: value }));
  };

  return (
    <div className={`chat ${isOpen && 'active'}`}>
      <h2 className='chat-topic chat-layout flex space-between'>
        Chat about this toy!
        <i className='fas fa-times' onClick={onClose}></i>
      </h2>
      <label>
        <input
          type='checkbox'
          name='isBotMode'
          checked={isBotMode}
          onChange={toggleBotMode}
          className='chat-layout'
        />
        Bot Mode
      </label>
      <h3>{typingUser?.isTyping && typingUser.username + 'is typing...'}</h3>

      <div className='chat-main-content'>
        <ul className='chat-msgs chat-layout'>
          {messages.map((currMessage, idx) => (
            <li key={idx}>
              <span className='from'>{currMessage.from}:</span>
              {currMessage.txt}
            </li>
          ))}
        </ul>
        <form className='msg-form' onSubmit={sendMsg}>
          <input
            type='text'
            value={currMessage.txt}
            onChange={handleMessageChange}
            name='txt'
            className='msg-input'
            autoComplete='off'
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

// export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
