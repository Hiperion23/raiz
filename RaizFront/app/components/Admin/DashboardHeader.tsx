"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import React, { FC, useState } from "react";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({open, setOpen}) => {
  return (
    <div className="w-full flex items-center justify-end fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          1
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notificaciones
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                Nueva Pregunta recibida
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Marcar como leido
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              voluptatem distinctio sit dolor dolorum, doloremque quibusdam
              natus at architecto sint laudantium itaque dolorem, quo recusandae
              tempora odio consectetur ipsam officia!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              hace 5 dias
            </p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                Nueva Pregunta recibida
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Marcar como leido
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              voluptatem distinctio sit dolor dolorum, doloremque quibusdam
              natus at architecto sint laudantium itaque dolorem, quo recusandae
              tempora odio consectetur ipsam officia!
            </p>
            <p className="text-black dark:text-white text-[14px]">hace 4 dias</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
