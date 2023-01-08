import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  iPropsServiceProvider,
  iListServiceHome,
  iServiceContext,
  iListServiceUserLogged,
} from "./type";
import { kindOfServices } from "./kindOfServices";

export const ServiceContext = createContext({} as iServiceContext);

export const ServiceProvider = ({ children }: iPropsServiceProvider) => {
  const [listServiceHome, setListServiceHome] = useState<iListServiceHome[]>(
    []
  );
  const [loadingListServiceHome, setLoadingListServiceHome] = useState(true);
  const [kindOfServiceSelectedHome, setKindOfServicesSelectedHome] =
    useState("Todos");

  const [listServiceUserLogged, setServiceUserLogged] = useState<
    iListServiceUserLogged[]
  >([]);
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [validatelistServiceUserLogged, setValidatelistServiceUserLogged] =
    useState(false);
  const [loadingListServiceDashboard, setLoadingListServiceDashboard] =
    useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const navigate = useNavigate();

  const requestRegisteredUserServices = async () => {
    const token = localStorage.getItem("@closework:token");
    const userId = localStorage.getItem("@closework:userId");
    if (token) {
      if (userId) {
        try {
          setLoadingListServiceDashboard(false);
          const response = await api.get(`/users/${userId}?_embed=services`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.services.length > 0) {
            setServiceUserLogged(response.data.services);
            setValidatelistServiceUserLogged(true);
          } else {
            setServiceUserLogged(response.data.services);
            setValidatelistServiceUserLogged(false);
          }
        } catch (error) {
          setLoadingListServiceDashboard(false);
          console.log(error);
        } finally {
          setLoadingListServiceDashboard(true);
        }
      }
    }
  };

  useEffect(() => {
    const requestServices = async () => {
      try {
        const response = await api.get("services");
        setListServiceHome(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListServiceHome(false);
      }
    };
    requestServices();
  }, []);

  const filteredServicesHome = listServiceHome.filter((service) => {
    if (kindOfServiceSelectedHome === "Todos") {
      return true;
    } else if (kindOfServiceSelectedHome !== "Outros") {
      return service.kind_of_service === kindOfServiceSelectedHome;
    } else {
      return kindOfServices.every(
        (servicesDefault) => servicesDefault !== kindOfServiceSelectedHome
      );
    }
  });

  return (
    <ServiceContext.Provider
      value={{
        filteredServicesHome,
        listServiceUserLogged,
        setKindOfServicesSelectedHome,
        openModal,
        setOpenModal,
        typeModal,
        setTypeModal,
        requestRegisteredUserServices,
        validatelistServiceUserLogged,
        loadingListServiceHome,
        loadingListServiceDashboard,
        loadingButtonModal,
        setLoadingButtonModal,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
