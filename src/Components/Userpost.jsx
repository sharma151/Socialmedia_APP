import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useState, useContext, useEffect } from "react";
import { UpdatedataContext } from "../Context/UpdateProfileContext";
import { HandleDeletePost, handleLikePost } from "../services/Handleapi";
import { AuthContext } from "../Context/Authcontext";
import { MdDelete } from "react-icons/md";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";
import "../Styles/Post.scss";
import { handleFetchallPost } from "../services/Handleapi";

// const DELETE_POST = "DELETE_POST";
// const SET_POSTS = "SET_POSTS";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Posts = ({ className, posts, onUpdate }) => {
  const { bookmarks, setBookmarks } = useContext(AuthContext);
  const { UserprofileData } = useContext(UpdatedataContext);
  // const [state, dispatch] = useReducer(reducer, { posts: [] });
  const [userposts, setUserposts] = useState(posts);

  const Handledeletepostsubmit = async (e, _id) => {
    e.preventDefault();
    try {
      const response = await HandleDeletePost(_id);
      if (response === 200) {
        toast.success("Post deleted successfully");
        if (onUpdate) {
          onUpdate();
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    }
  };

  const handleLikePostSubmit = async (_id) => {
    try {
      const response = await handleLikePost(_id);
      const updatedposts = userposts.map((post) => {
        if (post._id === _id) {
          post.isLiked = response.isLiked;
          if (response.isLiked) {
            post.likes++;
          } else {
            post.likes--;
          }
          return post;
        }
        return post;
      });
      setUserposts(updatedposts);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // const deletePost = (postId) => {
  //   dispatch({ type: DELETE_POST, payload: postId });
  // };

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case DELETE_POST:
  //       toast.success("post deleted");
  //       return {
  //         ...state,
  //         posts: state.posts.filter((post) => post._id !== action.payload),
  //       };

  //     case SET_POSTS:
  //       return {
  //         ...state,
  //         posts: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // }

  const handleBookmarkClick = (post) => {
    const isBookmarked = bookmarks.some((item) => item._id === post._id);

    if (isBookmarked) {
      setBookmarks(bookmarks.filter((item) => item._id !== post._id));
      toast.info("Removed from bookmarks");
    } else {
      setBookmarks([post, ...bookmarks]);
      toast.success("Added to bookmarks");
    }
  };

  // useEffect(() => {
  //   dispatch({ type: SET_POSTS, payload: posts });
  // }, [posts]);

  return (
    <div className={`posts ${className} increment decrement count  `}>
      {/* <h2>All Posts</h2> */}
      <div className="posts-list">
        {userposts.map((post) => (
          <div key={post._id} className="post-item">
            {post?.author?.account?.avatar?.url && (
              <img
                key={post?.id}
                src={post?.author?.account?.avatar?.url}
                alt={post?.avatar}
                className="avatar"
              />
            )}

            <p className="Username">{post?.author?.account?.username}</p>
            <div className="Name">
              <p className="FirstName">{post?.author?.firstName}</p>
              <p className="LastName">{post?.author?.lastName}</p>
              <p className="createdAt">{formatDate(post?.createdAt)}</p>
            </div>
            {UserprofileData._id === userposts?.author?._id && (
              <>
                <button
                  className="delete-btn"
                  // onClick={() => deletePost(post?._id)}
                  onClick={(e) => Handledeletepostsubmit(e, userposts?._id)}
                >
                  <MdDelete size={25} />
                </button>
              </>
            )}
            <p className="content">{post?.content}</p>
            <div className="images">
              {post?.images?.[0]?.url && (
                <img
                  src={post?.images?.[0]?.url}
                  alt={post.title}
                  className="post-image"
                />
              )}
            </div>
            <div className="Post-buttons">
              <button
                onClick={() => handleLikePostSubmit(post?._id)}
                className="Like-dislike"
              >
                {post?.isLiked ? (
                  <BiSolidLike size={27} />
                ) : (
                  <BiLike size={27} />
                )}
                {post.likes}
              </button>
              <button
                className="bookmark"
                onClick={() => handleBookmarkClick(post)}
              >
                {bookmarks.some((bookmark) => bookmark._id === post._id) ? (
                  <PiBookmarkSimpleFill size={27} />
                ) : (
                  <PiBookmarkSimpleBold size={27} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
