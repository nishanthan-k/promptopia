"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import useDebounce from "@hooks/useDebounce";
import Loader from "./Loader";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 
      lg:grid-cols-3 place-items-center gap-4 w-[320px] sm:w-[600px] md:w-[720px] lg:w-[1200px]'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch('/api/prompt', {
        method: 'POST',
        body: JSON.stringify({
          search: debouncedSearch,
        })
      });
      const data = await response.json();
      
      setPosts(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    fetchPosts();
  }, [debouncedSearch, searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for the prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <div className='mt-9 prompt_layout'>
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <>
          {searchText && posts.length === 0 ? (
            <h2 className='mt-9 p-6 text-lg text-gray-600 sm:text-xl'>No prompts found!</h2>
          ) : (
            <PromptCardList
              data={posts}
              handleTagClick={() => {}}
            />
          )}
        </>
      )}
    </section>
  )
}

export default Feed;
