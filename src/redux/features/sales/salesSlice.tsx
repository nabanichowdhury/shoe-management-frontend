

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
        console.log(year)
        state.filteredSales = state.sales.filter(
            (sale) => sale.dateOfSale.split('/')[2] == year
        );
        console.log(state.filteredSales)
    },
      filterByMonth: (state, action) => {
        const { year, month } = action.payload;
        console.log(year,month)
        state.filteredSales = state.sales.filter(
          (sale) =>
            sale.dateOfSale.split('/')[2] == year &&
            sale.dateOfSale.split('/')[1] == month
        );
        console.log(state.filteredSales)
      },
      filterByWeek: (state, action) => {
        const { year, month, week } = action.payload;
        console.log("Filtering by week:", { year, month, week });
  
        const referenceDate = parse(`${year}-${month}-22`, 'yyyy-MM-dd', new Date());
        const startDate = startOfWeek(referenceDate, { weekStartsOn: 1 });
        const endDate = endOfWeek(referenceDate, { weekStartsOn: 1 });
  
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
