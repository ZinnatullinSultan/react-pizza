import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps ={
  activePage: number;
  onChangePage: (index: number)=>void
}

const Pagination: React.FC<PaginationProps> = ({activePage, onChangePage}) => {
  return (
    <ReactPaginate
    className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={activePage -1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;