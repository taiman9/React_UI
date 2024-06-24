import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsData = await postsResponse.json();

        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersData = await usersResponse.json();

        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsData = await commentsResponse.json();

        // Process the data and map comments to relevant posts
        const processedPosts = postsData.map((post) => {
          const user = usersData.find((user) => user.id === post.userId);
          const comments = commentsData.filter(
            (comment) => comment.postId === post.id
          );

          return {
            id: post.id,
            title: post.title,
            body: post.body,
            user: user.name,
            comments: comments,
          };
        });

        // Sort posts in descending order of post ID
        const sortedPosts = processedPosts.sort((a, b) => b.id - a.id);

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.user}</h3>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <button>Expand</button>

          {/* Render comments */}
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <h5>{comment.email}</h5>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
