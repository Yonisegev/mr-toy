import React, { Component, useRef, useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import { socketService } from '../services/socketService';
import { useEffect } from 'react/cjs/react.development';
import { useSelector } from 'react-redux';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { Modal } from './Modal';

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
  const [isBotMode, toggleBotMode] = useToggle();

  const botModeIntervalId = useRef();

  useEffect(() => {
    socketService.setup();
    socketService.emit('chat topic', toy);
    socketService.on('chat addMsg', addMessage);
    socketService.on('userTyping', onUserTyping);
    return () => {
      socketService.off('chat addMsg', addMessage);
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
      setMessages((prevMessages) => ({
        msgs: [...prevMessages, { from: 'Bot', txt: 'You are amazing!' }],
      }));
    }, 1500);
  };

  const changeTopic = () => {
    socketService.emit('chat topic', topic);
  };

  const sendMsg = (ev) => {
    ev.preventDefault();
    const from = user.fullname || user.username || 'Me';
    socketService.emit('chat newMsg', { from, txt: currMessage.txt });
    setCurrMessage(INITIAL_STATE.typingUser);
  };

  const handleMessageChange = async (ev) => {
    const { name, value } = ev.target;
    const user = {
      username: user.fullname || user.username || 'guest',
      msg: value,
    };
    socketService.emit('typing', user);

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

class _Chat extends Component {
  state = {
    msg: { txt: '' },
    msgs: socketService.getMsgsFromStorage() || [],
    topic: this.props.toy._id,
    isBotMode: true,
    currTypingUser: {
      username: '',
      isTyping: false,
    },
  };

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.state.topic);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('userTyping', ({ username, msg }) => {
      this.setState(
        { currTypingUser: { username, isTyping: msg ? true : false } },
        () => {
          console.log('currTypingUser: ', this.state.currTypingUser);
        }
      );
    });
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.toy._id !== this.props.toy._id) {
      this.setState({ topic: this.props.toy._id, msgs: [] }, async () => {
        await socketService.emit('chat topic', this.state.topic);
      });
    }
  };

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
    clearTimeout(this.timeout);
  }

  addMsg = (newMsg) => {
    this.setState(
      (prevState) => ({ msgs: [...prevState.msgs, newMsg] }),
      () => {
        socketService.saveMsgsToStorage(this.state.msgs);
      }
    );
    if (this.state.isBotMode) this.sendBotResponse();
  };

  sendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState(
        (prevState) => ({
          msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }],
        }),
        () => {
          socketService.saveMsgsToStorage(this.state.msgs);
        }
      );
    }, 1500);
  };

  changeTopic = () => {
    socketService.emit('chat topic', this.state.topic);
  };

  sendMsg = (ev) => {
    ev.preventDefault();
    const from =
      this.props.loggedinUser?.fullname ||
      this.props.loggedinUser?.username ||
      'Me';
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt });
    this.setState({ msg: { from: 'Me', txt: '' } });
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value }, this.changeTopic);
  };

  msgHandleChange = async (ev) => {
    const { name, value } = ev.target;
    const user = {
      username:
        this.props.loggedinUser?.fullname ||
        this.props.loggedinUser?.username ||
        'guest',
      msg: value,
    };
    socketService.emit('typing', user);

    this.setState((prevState) => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value,
        },
      };
    });
  };

  render() {
    const { currTypingUser, msg } = this.state;
    const { isOpen } = this.props;
    return (
      <div className={`chat ${isOpen && 'active'}`}>
        <h2 className='chat-topic chat-layout flex space-between'>
          Chat about this toy!
          <i class='fas fa-times' onClick={this.props.onClose}></i>
        </h2>
        <label>
          <input
            type='checkbox'
            name='isBotMode'
            checked={this.state.isBotMode}
            onChange={(ev) => this.setState({ isBotMode: ev.target.checked })}
            className='chat-layout'
          />
          Bot Mode
        </label>
        <h3>
          {currTypingUser?.isTyping && currTypingUser.username + 'is typing...'}
        </h3>

        <div className='chat-main-content'>
          <ul className='chat-msgs chat-layout'>
            {this.state.msgs.map((msg, idx) => (
              <li key={idx}>
                <span className='from'>{msg.from}:</span>
                {msg.txt}
              </li>
            ))}
          </ul>
          <form class='msg-form' onSubmit={this.sendMsg}>
            <input
              type='text'
              value={msg.txt}
              onChange={this.msgHandleChange}
              name='txt'
              className='msg-input'
              autoComplete='off'
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedinUser: state.user.loggedinUser,
  };
};
const mapDispatchToProps = {};

// export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
