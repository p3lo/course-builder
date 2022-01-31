import { HiSearch } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Search = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);
  const [tippy, setTippy] = useState(null);

  const router = useRouter();

  const searchInDb = async (searchData: string) => {
    const { data } = await supabase
      .from('courses')
      .select('id, title, slug, author(username)')
      .textSearch('title', `${searchData}`, {
        type: 'websearch',
        config: 'english',
      });
    setSearchResults(data);
  };
  const debounceLoadData = useCallback(
    _.debounce((searchInput: string) => {
      searchInDb(searchInput);
    }, 300),
    []
  );
  useEffect(() => {
    if (tippy) {
      tippy.show();
      if (searchInput.length < 4) {
        tippy.hide();
      } else {
        debounceLoadData(searchInput);
      }
    }
  }, [searchInput]);

  const searchResult = (
    <div className="w-[200px] sm:w-[300px] lg:w-[400px] flex flex-col space-y-1">
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <Link key={item.id} href={`/detail/${item.slug}`}>
            <a
              className="flex flex-col justify-between w-full px-3 py-1 border border-gray-500 cursor-pointer group "
              onClick={() => router.reload()}
            >
              <p className="group-hover:text-blue-300">{item.title}</p>
              <p className="text-xs text-gray-400 ">{item.author.username}</p>
            </a>
          </Link>
        ))
      ) : (
        <p className="flex justify-center w-full p-3">No result found</p>
      )}
    </div>
  );
  return (
    <Tippy
      content={searchResult}
      animation="fade"
      interactive={true}
      arrow={false}
      theme="dark-search"
      placement="bottom-start"
      offset={[20, 10]}
      trigger="manual"
      maxWidth="100%"
      onCreate={(instance) => setTippy(instance)}
    >
      <div className="flex items-center pl-3 pr-1 rounded-full md:border-2">
        <input
          type="text"
          placeholder="Search..."
          spellCheck="false"
          className="w-full py-2 text-sm text-gray-200 placeholder-gray-300 bg-transparent outline-none active:border-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <HiSearch className="hidden p-1 text-white transition duration-150 ease-out transform bg-gray-700 rounded-full cursor-pointer w-7 h-7 md:inline-flex hover:scale-125" />
      </div>
    </Tippy>
  );
};

export default Search;
