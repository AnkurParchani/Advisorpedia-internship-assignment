import { toast } from "react-toastify";

// If there is any error from the api side
export const handleApiError = (err) => {
  // Operational Error
  if (err?.response?.data?.message) {
    toast(err.response.data.message, { type: "error" });

    // Network Error
  } else if (err?.message === "Network Error") {
    toast("There was a network error, check your connection", {
      type: "error",
    });

    // Server unknown Error
  } else {
    toast("Something went wrong, try again later", { type: "error" });
  }
};
