import { cartActions } from "./cart-slice";
import { uiAtions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reactcart-b7645-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiAtions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed! ",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAtions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data ",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://reactcart-b7645-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiAtions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully! ",
        })
      );
    } catch (error) {
      dispatch(
        uiAtions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed! ",
        })
      );
    }
  };
};
