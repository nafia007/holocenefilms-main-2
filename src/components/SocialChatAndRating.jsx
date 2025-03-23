<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { StarIcon, SmileIcon, SendIcon, AtSign, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SocialChatAndRating = ({ styleId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const emojis = ['👍', '❤️', '🔥', '👏', '🎨', '✨'];

  useEffect(() => {
    // Simulating real-time message fetching
    const fetchMessages = async () => {
      const initialMessages = [
        { id: 1, user: 'Alice', message: 'This style is amazing!', rating: 5, timestamp: new Date().toISOString(), reactions: ['👍', '🔥'] },
        { id: 2, user: 'Bob', message: 'I love the color palette.', rating: 4, timestamp: new Date().toISOString(), reactions: ['❤️'] },
      ];
      setChatMessages(initialMessages);
    };
    fetchMessages();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
=======
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

const SocialChatAndRating = ({ styleId }) => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Alice', message: 'This style is amazing!', rating: 5 },
    { id: 2, user: 'Bob', message: 'I love the color palette.', rating: 4 },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(0);
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
<<<<<<< HEAD

    const newChatMessage = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      rating: newRating,
      timestamp: new Date().toISOString(),
      reactions: []
    };

    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
    setNewRating(0);
    toast({
      title: "Message posted",
      description: "Your message has been posted successfully."
    });
  };

  const handleReaction = (messageId, emoji) => {
    setChatMessages(messages =>
      messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions.includes(emoji)
                ? msg.reactions.filter(r => r !== emoji)
                : [...msg.reactions, emoji]
            }
          : msg
      )
    );
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
    // Simulate typing indicator
    setTimeout(() => setIsTyping(false), 1000);

    // Handle mentions
    if (e.target.value.includes('@')) {
      const query = e.target.value.split('@').pop();
      setMentionQuery(query);
      // Simulate user search
      setSuggestedUsers(['alice', 'bob', 'charlie'].filter(user =>
        user.includes(query.toLowerCase())
      ));
    } else {
      setMentionQuery('');
      setSuggestedUsers([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      .format(-Math.round((Date.now() - new Date(timestamp).getTime()) / 60000), 'minute');
=======
    const newChatMessage = {
      id: chatMessages.length + 1,
      user: 'You', // In a real app, this would be the logged-in user's name
      message: newMessage,
      rating: newRating,
    };
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
    setNewRating(0);
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Social Chat & Ratings</h3>
<<<<<<< HEAD
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
=======
      <div className="space-y-4 mb-4">
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2">
            <Avatar>
              <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white font-bold">
                {msg.user[0]}
              </div>
            </Avatar>
<<<<<<< HEAD
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{msg.user}</p>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <p>{msg.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < msg.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  {msg.reactions.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleReaction(msg.id, emoji)}
                      className="hover:bg-gray-100 rounded px-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
=======
            <div>
              <p className="font-semibold">{msg.user}</p>
              <p>{msg.message}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < msg.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
              </div>
            </div>
          </div>
        ))}
<<<<<<< HEAD
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <Input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Add your comment..."
            className="w-full pr-24"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <SmileIcon className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {showEmojiPicker && (
          <div className="flex gap-2 p-2 bg-gray-50 rounded">
            {emojis.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setNewMessage(msg => msg + emoji);
                  setShowEmojiPicker(false);
                }}
                className="hover:bg-gray-100 rounded px-2 py-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        {suggestedUsers.length > 0 && (
          <div className="absolute z-10 bg-white shadow-lg rounded-md p-2">
            {suggestedUsers.map(user => (
              <div
                key={user}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setNewMessage(msg => msg.replace(`@${mentionQuery}`, `@${user} `));
                  setSuggestedUsers([]);
                }}
              >
                <AtSign className="h-4 w-4" />
                {user}
              </div>
            ))}
          </div>
        )}
=======
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add your comment..."
          className="w-full"
        />
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
        <div className="flex items-center space-x-2">
          <span>Rating:</span>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
<<<<<<< HEAD
              className={`h-6 w-6 cursor-pointer ${i < newRating ? 'text-yellow-400' : 'text-gray-300'}`}
=======
              className={`h-6 w-6 cursor-pointer ${
                i < newRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
              onClick={() => setNewRating(i + 1)}
            />
          ))}
        </div>
<<<<<<< HEAD
        {isTyping && (
          <div className="text-xs text-gray-500">Someone is typing...</div>
        )}
=======
        <Button type="submit">Post</Button>
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
      </form>
    </div>
  );
};

export default SocialChatAndRating;