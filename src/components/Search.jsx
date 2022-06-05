import { useContext } from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../App';


const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
      </svg>
      <input
        className={styles.input}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder='Поиск пиццы'
      />
      {searchValue ? (
        <svg
          viewBox='0 0 512 512'
          className={styles.clear}
          onClick={() => setSearchValue('')}>
          <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
        </svg>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
