import React, { FC, useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("Rol del usuario actualizado con éxito");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Usuario eliminado con éxito");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Nombre", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Rol", flex: 0.2 },
    { field: "properties", headerName: "Propiedades compradas", flex: 0.5 },
    { field: "created_at", headerName: "Fecha de Registro", flex: 0.5 },
    {
      field: " ",
      headerName: "Eliminar",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AiOutlineDelete />}
          onClick={() => {
            setOpen(true);
            setUserId(params.row.id);
          }}
          fullWidth
          className="mb-2"
        >
          Eliminar
        </Button>
      ),
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AiOutlineMail />}
          component="a"
          href={`mailto:${params.row.email}`}
          fullWidth
        >
          Email
        </Button>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newDate =
      data && data.users.filter((item: any) => item.role === "admin");
    newDate &&
      newDate.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          properties: item.properties.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          properties: item.properties.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={3}>
          <div className="grid gap-6 sm:grid-cols-1">
            {rows.map((item: any) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 shadow-md flex flex-col md:flex-row items-start md:items-center ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className={`text-gray-600 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Email: {item.email}
                  </p>
                  <p className={`text-gray-600 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Rol: {item.role}
                  </p>
                  <p className={`text-gray-600 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Propiedades compradas: {item.properties}
                  </p>
                  <p className={`text-gray-600 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Fecha de Registro: {item.created_at}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 w-full md:w-auto">
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AiOutlineDelete />}
                    onClick={() => {
                      setOpen(true);
                      setUserId(item.id);
                    }}
                    fullWidth
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AiOutlineMail />}
                    component="a"
                    href={`mailto:${item.email}`}
                    fullWidth
                  >
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
              >
                <h1 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  ¿Está seguro que desea eliminar este usuario?
                </h1>
                <div className="flex justify-between">
                  <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleDelete}>
                    Eliminar
                  </Button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
