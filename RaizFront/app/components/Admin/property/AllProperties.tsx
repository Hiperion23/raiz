import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useGetAllPropertiesQuery,
  useDeletePropertyMutation,
} from "@/redux/features/property/propertiesApi";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Props = {};

interface Property {
  _id: string;
  image: string;
  name: string;
  location: string;
  price: string;
  description: string;
}

const AllProperties = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [propertieId, setPropertieId] = useState("");
  const { isLoading, data, refetch } = useGetAllPropertiesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deletePropertie, { isSuccess, error }] = useDeletePropertyMutation({});

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Propiedad eliminada con éxito");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = propertieId;
    await deletePropertie(id);
  };

  return (
    <div className="mt-32">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={3}>
          <div className="grid grid-cols-1 gap-6">
            {data &&
              data.properties.map((item: Property) => (
                <div
                  key={item._id}
                  className={`border rounded-lg p-4 shadow-md flex items-center ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <h2
                      className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.name}
                    </h2>
                    <p
                      className={`text-gray-600 ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.location}
                    </p>
                    <p
                      className={`text-gray-600 ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.price}
                    </p>
                    <p
                      className={`text-gray-600 ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <Link href={`/admin/edit-propertie/${item._id}`}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FiEdit2 />}
                        fullWidth
                      >
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<AiOutlineDelete />}
                      onClick={() => {
                        setOpen(true);
                        setPropertieId(item._id);
                      }}
                      fullWidth
                    >
                      Eliminar
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
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <h1 className="text-xl font-bold mb-4">
                  ¿Está seguro que desea eliminar esta propiedad?
                </h1>
                <div className="flex justify-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                  >
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

export default AllProperties;
