import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Community = () => {
  const [posts, setPosts] = React.useState([
    { id: 1, author: 'Artist1', content: 'Just uploaded a new art style!', likes: 5 },
    { id: 2, author: 'User1', content: 'Looking for collaborators on an AI art project.', likes: 3 },
  ]);

  const [newPost, setNewPost] = React.useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;
    const newPostObj = {
      id: posts.length + 1,
      author: 'CurrentUser', // In a real app, this would be the logged-in user
      content: newPost,
      likes: 0,
    };
    setPosts([...posts, newPostObj]);
    setNewPost('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ArtStyleAI Community</h1>
      <div className="mb-8">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts or ask for collaboration..."
            className="w-full"
          />
          <Button type="submit">Post</Button>
        </form>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{post.author}</h3>
            <p className="mt-2">{post.content}</p>
            <div className="mt-4 flex items-center">
              <Button variant="outline" size="sm">Like ({post.likes})</Button>
              <Input type="text" placeholder="Add a comment..." className="ml-4 flex-grow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;