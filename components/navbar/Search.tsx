import { HiSearch } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import _ from 'lodash';
const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tippy, setTippy] = useState(null);

  console.log(searchResults);

  const searchInDb = async (searchData) => {
    const { data } = await supabase
      .from('courses')
      .select('title, slug, author(username)')
      .textSearch('title', `${searchData}`, {
        type: 'websearch',
        config: 'english',
      });
    setSearchResults(data);
  };
  const debounceLoadData = useCallback(
    _.debounce((searchInput) => {
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
    <div className="">
      {searchResults.length > 0 ? (
        <p className="w-1/3">{JSON.stringify(searchResults, null, 2)}</p>
      ) : (
        <p>No result found</p>
      )}
    </div>
  );
  return (
    <Tippy
      content={searchResult}
      animation="fade"
      interactive={true}
      arrow={false}
      theme="dark"
      placement="bottom-start"
      offset={[20, 10]}
      maxWidth="100%"
      trigger="manual"
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
