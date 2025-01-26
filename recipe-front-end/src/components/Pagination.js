const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
          {pageNumbers.map((number) => (
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
          ))}
      </nav>
    );
  };
export default Pagination  