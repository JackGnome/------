import { catalogSlice } from '@/store/catalog/catalogSlice';
import { documentSlice } from '@/store/document/documentSlice';
import { productSlice } from '@/store/product/productSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    [documentSlice.name]: documentSlice.reducer,
    [productSlice.name]: productSlice.reducer,
    [catalogSlice.name]: catalogSlice.reducer,
});

export default rootReducer;
