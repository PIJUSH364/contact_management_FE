import { useCallback } from "react";
import axios from "axios";
import {
  addContact,
  addContactMetaData,
  setInitialPageRange,
  setLoaderStatus,
} from "../../../features/contactSlice";
import { baseurl } from "../../../env";
import { useDispatch } from "react-redux";
import { useFetchCategoryContact } from "./useFetchCategoryContact";
import { status } from "../../../Enum";
import toast, { Toaster } from "react-hot-toast";

export const useFetchContacts = () => {
  const dispatch = useDispatch();
  const fetchCategoryContact = useFetchCategoryContact();
  const fetchContacts = useCallback(
    async (query = "", pageIndex = 1, filterBy = "") => {
      dispatch(setLoaderStatus(true));
      query = query.trim();
      filterBy = filterBy.trim();
      try {
        const response = await axios.get(
          `${baseurl}/all_contact?page=${pageIndex}&limit=5&search=${query}${
            status.includes(filterBy) ? `&filterBy=${filterBy}` : ""
          }`
        );

        if (response?.data?.code === 200 && response.data?.data?.data) {
          toast.success(response.data.message);
          const { data, meta } = response.data.data;
          dispatch(addContact(data));
          dispatch(addContactMetaData(meta));
          fetchCategoryContact(query, filterBy);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error.message);
        toast.error(error.message);
      } finally {
        pageIndex == 1 && dispatch(setInitialPageRange());
        dispatch(setLoaderStatus(false));
      }
    },
    [dispatch]
  );

  return fetchContacts;
};
