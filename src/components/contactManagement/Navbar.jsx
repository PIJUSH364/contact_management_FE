import React from "react";

export default function Navbar() {
  return (
    <div className=" py-2 px-4 ">
      <div className="flex justify-between ">
        <img
          src="https://website-assets-fw.freshworks.com/attachments/cks4jrkww07r6n9g0m9u543em-11239-freshsales-illustration-01.one-half.png"
          alt="logo"
          srcset=""
          className="w-20"
        />

        <div className="border-2 border-black  rounded-full  p-2">
          <img
            src="https://leadershipcircle.com/wp-content/uploads/2020/08/Katie-Everett-.png"
            alt="logo"
            srcset=""
            className="w-10"
          />
        </div>
      </div>
    </div>
  );
}