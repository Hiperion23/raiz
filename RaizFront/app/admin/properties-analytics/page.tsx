"use client";
import React, { useState, FC } from "react";
import AdminProtected from "../../hooks/adminProtected";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Heading from "../../utils/Heading";
import DashboardHero from "../../components/Admin/DashboardHero";
import PropertiesAnalytics  from "../../components/Admin/Analytics/PropertiesAnalytics";

type Props = {};

const Page = (props:Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`raiz - Admin-FAQ`}
          description="En esta plataforma de bienes y raices encontraras el terreno de tus sueños para que
       vivas tus sueños "
          Keywords="Departamentos, Casas, Terrenos"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={false} />
  
            <PropertiesAnalytics/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};
export default Page;
