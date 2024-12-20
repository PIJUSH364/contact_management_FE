import React, { useState } from "react";
import Pagination from "./Pagination";
import Modal from "../common/Modal";
import { useSelector } from "react-redux";
import DeleteModel from "../common/modal/DeleteModel";
import ContactModel from "../common/modal/ContactModel";

export default function Table() {
  const [EditContactData, setEditContactData] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [shouldShow, setShouldShow] = useState(false);
  const [selectModal, setSelectModal] = useState({
    deleteModal: false,
    editContactModal: false,
  });
  const contactList = useSelector((state) => state.contact.contactList);

  return (
    <>
      <div style={{ height: "calc(100vh - 85px)" }}>
        <table className="border-b-[1px] border-[#79808c]">
          <thead className="border-none">
            <tr>
              <th className="border-none w-16 sm:w-24 md:w-32">Contact Id</th>
              <th className="border-none w-24 sm:w-40 md:w-48">Name</th>
              <th className="border-none w-40 sm:w-60 md:w-80">Email</th>
              <th className="border-none w-20 sm:w-32 md:w-40">Phone</th>
              <th className="border-none w-16 sm:w-28 md:w-36">Tag</th>
              <th className="border-none w-16 sm:w-28 md:w-36">Status</th>
              <th className="border-none text-center w-20 sm:w-24 md:w-32">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#79808c]">
            {contactList.map((contact, index) => (
              <tr key={contact.id}>
                <td>{contact.contact_id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td>
                  <button className=" bg-[#303339] px-4 py-[1px] rounded-[4px] text-[15px] capitalize">
                    {contact.tag}
                  </button>
                </td>
                <td>
                  <button
                    className={` bg-[#303339] px-4 py-[1px] rounded-[4px] text-[15px] capitalize border-[1px] border-[#${
                      index == 1 ? "48bb78" : "4299e1"
                    }]`}
                  >
                    {contact.status}
                  </button>
                </td>
                <td className="flex gap-4 justify-center">
                  <i
                    onClick={() => {
                      setEditContactData(contact);
                      setShouldShow(true);
                      setSelectModal(() => ({
                        deleteModal: false,
                        editContactModal: true,
                      }));
                    }}
                    className="fa-regular fa-pen-to-square text-blue-500 hover:text-blue-700 cursor-pointer"
                  ></i>
                  <i
                    className="fa-solid fa-trash text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => {
                      setShouldShow(true);
                      setDeleteContactId(contact.id);
                      setSelectModal(() => ({
                        deleteModal: true,
                        editContactModal: false,
                      }));
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
      <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
        {selectModal.deleteModal && (
          <DeleteModel setShouldShow={setShouldShow} id={deleteContactId} />
        )}
        {selectModal.editContactModal && (
          <ContactModel
            setShouldShow={setShouldShow}
            defaultFormData={EditContactData}
            isEditModal={true}
          />
        )}
      </Modal>
    </>
  );
}
