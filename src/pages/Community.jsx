import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([
    { id: 1, author: 'FilmMaker1', content: 'Just wrapped up shooting my latest film!', likes: 5 },
    { id: 2, author: 'Producer1', content: 'Looking for collaborators on an upcoming project.', likes: 3 },
  ]);

  const [newPost, setNewPost] = useState('');
  const [isAdmin] = useState(true); // In production, this would come from auth state

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;
    const newPostObj = {
      id: posts.length + 1,
      author: 'CurrentUser',
      content: newPost,
      likes: 0,
    };
    setPosts([...posts, newPostObj]);
    setNewPost('');
    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
    });
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post Deleted",
      description: "The post has been removed from the community.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Filmmaker Community</h1>
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
          <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{post.author}</h3>
              {isAdmin && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </Button>
              )}
            </div>
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