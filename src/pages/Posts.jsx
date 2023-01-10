import { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://codebuddy.review/posts ', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        // eslint-disable-next-line
        console.log('Success:', result);
        setPosts(result.data.posts);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>List of posts</h2>
      <div className="row gap card-container">
        {posts.map(post => (
          <div key={post.id} className="col-sm-12 col-md-6 col-lg-4 col-4 border rounded card">
            <div>
              <div>
                <b>id:</b> {post.id}
              </div>
              <div>
                <b>firstName:</b> {post.firstName}
              </div>
              <div>
                <b>lastName:</b> {post.lastName}
              </div>
              <div>
                <b>writeup:</b> {post.writeup}
              </div>
              <br />
            </div>
            <img src={post.image} alt="author" className="object-fit-contain w-100" />
            {/* <img src={post.avatar} alt="avatar" /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
