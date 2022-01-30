import { HiSearch } from 'react-icons/hi';

const Search = () => {
  return (
    <div className="flex items-center pl-3 pr-1 rounded-full md:border-2">
      <input
        type="text"
        placeholder="Search..."
        spellCheck="false"
        className="w-full py-2 text-sm text-gray-200 placeholder-gray-300 bg-transparent outline-none active:border-none"
      />
      <HiSearch className="hidden p-1 text-white transition duration-150 ease-out transform bg-gray-700 rounded-full cursor-pointer w-7 h-7 md:inline-flex hover:scale-125" />
    </div>
  );
};

export default Search;
