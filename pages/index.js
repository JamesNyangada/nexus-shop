import React, { useState } from 'react';
import { client } from '../lib/client';
import { ProductCard } from '../components';

const ITEMS_PER_PAGE = 12; // Maximum products per page

const Home = ({ products, bannerData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the number of pages
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Get the products for the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handler for page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='container'>
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>Our simple yet diverse shop</p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '2rem',  }} className='pagination'>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          style={{ marginRight: '1rem' }}
          className='button'
        >
          <span className='span'>First Page</span>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: '1rem' }}
          className='button'
        >
          <span className='span'>Previous</span>
        </button>

        <div className='heading-page'>
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='button'
        >
          <span className='span'>Next</span>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '1rem' }}
          className='button'
        >
          <span className='span'>Last Page</span>
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  };
};

export default Home;
