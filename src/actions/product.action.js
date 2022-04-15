import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                payload: res.data
            });
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

// export const getAllProducts = (variables) => {
//     Axios.post('product/AllProducts', variables)
//         .then(response => {
//             if (response.data.success) {
//                 setProducts(response.data.products)
//                 setPostSize(response.data.postSize)
//             } else {
//                 alert('Failed to fectch product datas')
//             }
//         })
// }

// export const getAllProducts = () => {
//     return async (dispatch) => {
//       try {
//         dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
//         const res = await axios.get(`/AllProducts`);
//         if (res.status === 200) {
//           const { products } = res.data;
//           dispatch({
//             type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
//             payload: { products },
//           });
//         } else {
//           dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   };

  