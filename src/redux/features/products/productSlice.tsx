import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IShoe {
  _id: string;
  name: string;
  productQuantity: number;
  productPrice: number;
  brand: string;
  size: string;
  color: string;
  releaseDate: string;
  model: string;
  sellerInfo: {
    sellerName: string;
    sellerId: string;
  };
  sellingDetails: {
    sold: boolean;
    buyerId: string | null;
  };
}

const initialState: IShoe = {
  _id: '',
  name: '',
  productQuantity: 0,
  productPrice: 0,
  brand: '',
  size: '',
  color: '',
  releaseDate: '',
  model: '',
  sellerInfo: {
    sellerName: '',
    sellerId: '',
  },
  sellingDetails: {
    sold: false,
    buyerId: null,
  },
};

const shoeSlice = createSlice({
  name: 'shoe',
  initialState,
  reducers: {
    shoeAdd: (state, action: PayloadAction<IShoe>) => {
      return { ...state, ...action.payload };
    },
    shoeUpdate: (state, action: PayloadAction<Partial<IShoe>>) => {
      return { ...state, ...action.payload };
    },
    shoeDelete: () => {
     
      return initialState;
    },
  },
});

export const { shoeAdd, shoeUpdate, shoeDelete } = shoeSlice.actions;
export default shoeSlice.reducer;
