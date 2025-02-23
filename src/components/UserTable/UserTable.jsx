import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../features/users/userSlice";
import ViewProfile from "../common/modal/ViewProfile";
import Modal from "../common/Modal";
import UpdateUserModel from "../common/modal/UpdateUserModel";
import { useFetchUsers } from "../custom/Hook/useFetchUsers";
import { CustomSkelton } from "../../utils/Helper";
import DeleteModel from "../common/modal/DeleteModel";
import { useDebouncedEffect } from "../custom/Hook/useDebouncedEffect";

const UserTable = ({ selectedUsers, setSelectedUsers, isRest }) => {
    const [sortByDesc, setSortByDesc] = useState(true);
    const [shouldShow, setShouldShow] = useState(false);
    const [menuIndex, setMenuIndex] = useState(-1);

    const dispatch = useDispatch();
    const { fetchUser } = useFetchUsers();
    const users = useSelector((state) => state.user.userList);
    const userDataLoader = useSelector((state) => state.user.userDataLoader);
    const { currentPage, pageSize } = useSelector(
        (state) => state.user.paginationMetaData
    );
    const searchValue = useSelector((state) => state.user.searchValue);
    const {
        editUserModalStatus,
        permissionUserModalStatus,
        viewUserModalStatus,
    } = useSelector((state) => state.user.allModalStatus);

    const handleSort = () => {
        const data = [...users].sort((a, b) =>
            sortByDesc
                ? new Date(a.updatedAt) - new Date(b.updatedAt)
                : new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        dispatch(addUser(data));
    };

    const toggleMenu = (index) => {
        setMenuIndex(index === menuIndex ? -1 : index);
    };

    const handleSelect = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAllSelect = () => {
        setSelectedUsers((prev) =>
            prev.length === users.length ? [] : [...users.map((user) => user.id)]
        );
    };

    useEffect(() => {
        // alert("first render");
        fetchUser();
    }, []);

    useDebouncedEffect(
        () => {
            // alert("once any value change");
            fetchUser(currentPage, pageSize);
        },
        [isRest, searchValue, currentPage, pageSize],
        2000
    );

    return (
        <div className="rounded-lg border border-gray-200">
            {viewUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <ViewProfile
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}
            {editUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <UpdateUserModel
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}
            {permissionUserModalStatus && (
                <Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
                    <UpdateUserModel
                        setShouldShow={setShouldShow}
                        menuIndex={menuIndex}
                        permissionModal={true}
                        toggleMenu={toggleMenu}
                    />
                </Modal>
            )}

            <div className="overflow-y-auto max-h-[400px]">
                {userDataLoader ? (
                    <CustomSkelton msg="Loading..." />
                ) : users.length ? (
                    <table className="min-w-full table-fixed border-collapse">
                        {/* Sticky Header */}
                        <thead className="sticky top-0  z-50 shadow-sm">
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 rounded-tl-lg ">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === users.length}
                                        onChange={handleAllSelect}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                </th>
                                <th className="p-3 font-nunito ">User Name</th>
                                <th className="p-3 font-nunito ">Access</th>
                                <th className="p-3 font-nunito ">Status</th>
                                <th
                                    className="p-3 font-nunito cursor-pointer "
                                    onClick={() => {
                                        handleSort();
                                        setSortByDesc(!sortByDesc);
                                    }}
                                >
                                    <div className="inline-flex items-center gap-1">
                                        Last Active
                                        {sortByDesc ? (
                                            <FaArrowDown className="text-gray-600" />
                                        ) : (
                                            <FaArrowUp className="text-gray-600" />
                                        )}
                                    </div>
                                </th>
                                <th className="p-3 font-nunito ">Date Added</th>
                                <th className="p-3 font-nunito rounded-tr-lg ">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Scrollable Table Body */}
                        <tbody className=" overflow-y-auto max-h-[300px] w-full cursor-pointer">
                            {users.map((user, index) => (
                                <UserRow
                                    key={index}
                                    user={user}
                                    index={index}
                                    toggleMenu={toggleMenu}
                                    menuIndex={menuIndex}
                                    setShouldShow={setShouldShow}
                                    onSelect={handleSelect}
                                    isSelected={selectedUsers.includes(user.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <CustomSkelton msg="No record found!   :)" />
                )}
            </div>
        </div>

    );
};

export default UserTable;
