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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const newChatMessage = {
      id: chatMessages.length + 1,
      user: 'You', // In a real app, this would be the logged-in user's name
      message: newMessage,
      rating: newRating,
    };
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
    setNewRating(0);
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Social Chat & Ratings</h3>
      <div className="space-y-4 mb-4">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2">
            <Avatar>
              <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white font-bold">
                {msg.user[0]}
              </div>
            </Avatar>
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add your comment..."
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <span>Rating:</span>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-6 w-6 cursor-pointer ${
                i < newRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setNewRating(i + 1)}
            />
          ))}
        </div>
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default SocialChatAndRating;