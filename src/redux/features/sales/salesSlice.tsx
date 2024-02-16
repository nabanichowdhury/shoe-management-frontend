

import { createSlice } from '@reduxjs/toolkit';
import { startOfWeek, endOfWeek, isWithinInterval, parse } from 'date-fns';

interface ISales {
    _id: string;
    sellerId: string;
    buyer: string;
    soldQuantity: number;
    soldItem: string;
    saleAmount: number;
    dateOfSale: string; // You might want to use a Date type instead
  }
  
  interface Iinitial{
    sales:ISales[],
    filteredSales:ISales[]

  }
  
const initialState:Iinitial = {
  sales : [],
  filteredSales: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSales: (state, action) => {
        state.sales = action.payload;
       
      },
      filterByYear: (state, action) => {
        const { year } = action.payload;
       
        state.filteredSales = state.sales.filter(
            (sale) => sale.dateOfSale.split('/')[2] == year
        );
        
    },
      filterByMonth: (state, action) => {
        const { year, month } = action.payload;
        
        state.filteredSales = state.sales.filter(
          (sale) =>
            sale.dateOfSale.split('/')[2] == year &&
            sale.dateOfSale.split('/')[1] == month
        );
        
      },
      filterByWeek: (state) => {
       
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
      
        const formattedDateString = `${year}-${month}-${day}`;
      
        const reference=new Date(formattedDateString);

        const startDate = startOfWeek(reference, { weekStartsOn: 1 });
        const endDate = endOfWeek(reference, { weekStartsOn: 1 });
        
  
        state.filteredSales = state.sales.filter((sale) => {
          const saleDate = parse(sale.dateOfSale, 'dd/MM/yyyy', new Date());
  
          const isWithin = isWithinInterval(saleDate, { start: startDate, end: endDate });
  
          return isWithin;
        });
        
    },
    filterByDate: (state, action) => {
        const { date } = action.payload;
        state.filteredSales = state.sales.filter(
          (sale) => new Date(sale.dateOfSale) <= new Date(date)
        );
      },
  },
});

export const { setSales, filterByYear, filterByMonth, filterByWeek } =
  salesSlice.actions;

export default salesSlice.reducer;
