import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from ''

const Products = ({ match }) => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, error, productsCount, resultPerPage } = useSelector(
        (state) => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>


                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>


                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
};

export default Products;
