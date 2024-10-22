import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        console.log(err);
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/product/");
        dispatch(getProductSuccess(res.data));
    }catch(err){
        console.log(err);
        dispatch(getProductFailure())
    }
}

export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/product/${id}`);
        dispatch(deleteProductSuccess(id));
    }catch(err){
        console.log(err);
        dispatch(deleteProductFailure())
    }
}

export const updateProducts = async (id, product, dispatch) => {
    console.log(id,product);
    dispatch(updateProductStart());
    try{
        const res = await userRequest.put(`/product/${id}`, product);
        dispatch(updateProductSuccess({id, product}));
    }catch(err){
        console.log(err);
        dispatch(updateProductFailure())
    }
}

export const addProducts = async (formData, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(addProductFailure());
    }
};
