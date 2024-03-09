import {
  createContext,
  useContext,

  useReducer,
} from "react";

const CartContext = createContext(null);

const data = {
  cartItems: [],
  SearchItems: [],
  AllItems: [],
  discountCode:null
};

const Reducer = (state, action) => {
  const existingProduct = state.cartItems.find(
    (item) => item.id === action.payload.id
  );
  // const ErrorinInfo = state.cartItems.filter((item)=>{
  //   return     !(  )?item : "" 
  // });
  switch (action.type) {
    case "AddToCart":
      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                  Totalprice: (item.quantity + action.payload.quantity) * item.price,
                }
              : item
          ),
        };
      } else {
        // If the product is not in the cart, add it with the provided quantity and calculate total price
        const newCartItem = {
          ...action.payload,
          Totalprice: action.payload.quantity * action.payload.price,
        };

        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
        };
      }
    case "DeleteFromCart":
      const updatedState = {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
      return updatedState;

    case "ResetYourCart":
      return {
        ...state,
        cartItems: [],
      };

    case "EditOnQtyItemCart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.counter ,   Totalprice: action.payload.counter  * item.price }
            : item
        ),
      };

    case "ReflectChangesItemCart":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id === action.payload.id && item.quantity > 0),
      };

    case "SearchItemCart":
      return {
        ...state,
        SearchItems: state.AllItems?.filter((item) => item.title === action.payload.title),
      };

    case "SetAllItems":
      return {
        ...state,
        AllItems: action.payload.Data,
      };
    case "CheckErrorsInCart":


      return {
        ...state,
        cartItems: state.cartItems.filter((item)=>{
          return item.id &&  item.price && item.quantity && item.img && item.title && item.stock
        }),
        
      };

      case "ApplyDiscount":


      return {
        ...state,
        discountCode: action.payload.discountCode,
        
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, data);

  const AddToCart = (id, price, quantity, img, title, stock , Totalprice) =>
    dispatch({
      type: "AddToCart",
      payload: {
        id: id,
        price: price,
        quantity: quantity,
        img: img,
        title: title,
        stock: stock,
        Totalprice: Totalprice,
      },
    });
  
  const DeleteFromCart = (id) =>
    dispatch({ type: "DeleteFromCart", payload: { id: id } });
  
  const EditOnQtyItemCart = (id, counter) =>
    dispatch({ type: "EditOnQtyItemCart", payload: { id: id, counter: counter } });
  
  const ReflectChangesItemCart = (id) =>
    dispatch({ type: "ReflectChangesItemCart", payload: { id: id } });
  
  const ResetYourCart = () =>
    dispatch({ type: "ResetYourCart", payload: null });
  
  const SearchItemCart = (title) =>
    dispatch({ type: "SearchItemCart", payload: { title: title } });
  
  const SetAllItems = (Data) =>
    dispatch({ type: "SetAllItems", payload: { Data: Data } });
  
  const ApplyDiscount = (discountCode) =>
    dispatch({ type: "ApplyDiscount", payload: { discountCode: discountCode } });
  
  
    const  TotalPrice =   state.cartItems.reduce((curr , acc)=>{
      return curr + acc.Totalprice;
    } , 0 )
  
  return (
    <CartContext.Provider
      value={{
        state,
        AddToCart,
        DeleteFromCart,
        ResetYourCart,
        EditOnQtyItemCart,
        ReflectChangesItemCart,
        SearchItemCart,
        SetAllItems,
        ApplyDiscount,
      TotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  
  return useContext(CartContext);
};
