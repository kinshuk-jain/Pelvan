/* eslint-disable no-cond-assign, no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import isEmpty from 'lodash/isEmpty';
import s from './Search.component.css';

const SearchResults = ({ searchResults, selectedKey, ...props }) =>
  !isEmpty(searchResults) ? (
    <ul {...props}>
      {searchResults.map((data, index) => (
        <li
          className={classNames(s.searchItem, {
            [s.active]: selectedKey === index,
          })}
          key={index}
        >
          <span className={s.searchSuggestion}>{data}</span>
        </li>
      ))}
    </ul>
  ) : null;

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  selectedKey: PropTypes.number.isRequired,
};

const RecentSearchResults = ({
  recentSearches,
  selectedKey,
  searchResultsLength,
  ...props
}) =>
  !isEmpty(recentSearches) ? (
    <ul {...props}>
      <div className={s.popProd}>Recent Searches</div>
      {recentSearches.map((data, index) => (
        <li
          className={classNames(s.searchItem, {
            [s.active]: selectedKey === index + searchResultsLength,
          })}
          key={index}
        >
          <span>{data}</span>
          <i className="icon-arrow-up-left2" />
        </li>
      ))}
    </ul>
  ) : null;

RecentSearchResults.propTypes = {
  recentSearches: PropTypes.array.isRequired,
  selectedKey: PropTypes.number.isRequired,
  searchResultsLength: PropTypes.number.isRequired,
};

// TODO: search suggestions should not show more than 5 results
const Search = props => {
  const Results = SearchResults;
  const RecentSearches = RecentSearchResults;
  const {
    innerRef,
    expand,
    searchResults,
    selectedKey,
    onClick,
    onBlur,
    onKeyUp,
    recentSearches,
    placeholder,
  } = props;
  return (
    <div className={s.searchBar}>
      <i className="icon-search" />
      <input
        ref={innerRef}
        onClick={onClick}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        autoComplete="off"
        type="search"
        placeholder={placeholder}
      />
      {expand && (
        <div className={s.suggestedSearch}>
          <Results searchResults={searchResults} selectedKey={selectedKey} />
          <RecentSearches
            recentSearches={recentSearches}
            searchResultsLength={searchResults.length}
            selectedKey={selectedKey}
          />
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  innerRef: PropTypes.func.isRequired,
  expand: PropTypes.bool.isRequired,
  selectedKey: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  recentSearches: PropTypes.array,
  searchResults: PropTypes.array,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  recentSearches: [],
  searchResults: [],
  placeholder: 'Search by name, category or region',
};

export default withStyles(s)(Search);
