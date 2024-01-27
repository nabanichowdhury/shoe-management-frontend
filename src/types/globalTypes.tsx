interface IShoe {
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
  
  export default IShoe;
  