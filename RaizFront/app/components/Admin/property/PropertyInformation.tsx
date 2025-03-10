import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  propertyInfo: any;
  setPropertyInfo: (propertyInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const PropertyInformation: FC<Props> = ({
  propertyInfo,
  setPropertyInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setPropertyInfo({ ...propertyInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPropertyInfo({ ...propertyInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Nombre de la Propiedad</label>
          <input
            type="name"
            required
            value={propertyInfo.name}
            onChange={(e: any) =>
              setPropertyInfo({ ...propertyInfo, name: e.target.value })
            }
            id="name"
            placeholder="Introduce el nombre de la propiedad"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Descripción de la propiedad</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Escribe algo asombroso..."
            className={`${styles.input} !h-min !py-2`}
            value={propertyInfo.description}
            onChange={(e: any) =>
              setPropertyInfo({ ...propertyInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Precio</label>
            <input
              type="number"
              name=""
              required
              value={propertyInfo.price}
              onChange={(e: any) =>
                setPropertyInfo({ ...propertyInfo, price: e.target.value })
              }
              id="price"
              placeholder="Introduce el precio"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Descuento (opcional)</label>
            <input
              type="number"
              name=""
              value={propertyInfo.estimatedPrice}
              onChange={(e: any) =>
                setPropertyInfo({
                  ...propertyInfo,
                  estimatedPrice: e.target.value,
                })
              }
              id="price"
              placeholder="Introduce el descuento"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="email" className={`${styles.label}`}>
              Etiquetas de la Propiedad
            </label>
            <input
              type="text"
              required
              name=""
              value={propertyInfo.tags}
              onChange={(e: any) =>
                setPropertyInfo({
                  ...propertyInfo,
                  tags: e.target.value,
                })
              }
              id="tags"
              placeholder="Introduce etiquetas"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Categorías de la Propiedad</label>
            <select 
            name="" 
            id="" 
            className={`${styles.input}`}
            value={propertyInfo.categories}
            onChange={(e:any)=>
              setPropertyInfo({...propertyInfo, categories: e.target.value})
            } >
              <option value="">Selecciona Categoría</option>
              {categories.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Nivel de la Propiedad</label>
            <input
              type="text"
              name=""
              required
              value={propertyInfo.level}
              onChange={(e: any) =>
                setPropertyInfo({ ...propertyInfo, level: e.target.value })
              }
              id="level"
              placeholder="ALTO medio bajo"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Ubicación de la Demo (opcional)</label>
            <input
              type="text"
              name=""
              value={propertyInfo.location}
              onChange={(e: any) =>
                setPropertyInfo({
                  ...propertyInfo,
                  location: e.target.value,
                })
              }
              id="demoUrl"
              placeholder="Introduce la URL de la demo"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {propertyInfo.thumbnail ? (
              <img
                src={propertyInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Arrastra y suelta tu miniatura aquí o haz clic para explorar
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Siguiente"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default PropertyInformation;
