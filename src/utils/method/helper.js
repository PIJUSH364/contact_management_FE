import axios from "axios";

export const dateFormatter = (date = new Date()) => {
  return new Date(date)
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};

export const Role = ["Member", "Admin", "Super_Admin"];
export const Status = ["Active", "InActive"];
