import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productReviews.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearErrors,
    getAllReviews,
    deleteReviews,
} from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstant';
import Star from "@material-ui/icons/Star";

const ProductReview = ({ history }) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const deleteProductHandler = (id) => {
        //dispatch(deleteProduct(id));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getAllReviews(productId));
    };

    const [productId, setProductId] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            history.push("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 0.4,
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 350,
            flex: 0.6,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            minWidth: 100,
            flex: 0.2,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">

                    <form
                        className="createProductForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1>ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Update
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}

                </div>
            </div>
        </Fragment>
    );
};


export default ProductReview;
