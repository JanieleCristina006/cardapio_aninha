import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { defaultProfile } from "../../data/catalog";
import { useCart } from "../../hooks/useCart";
import {
  getAccessToken,
  getCustomerProfile,
  getOrders,
} from "../../services/api";
import { EditProfileModal } from "./EditProfileModal";
import { PerfilUsuario } from "./PerfilUsuario";

export const PerfilPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [profile, setProfile] = useState(defaultProfile);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");
  const [ordersError, setOrdersError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      if (!getAccessToken()) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setOrdersLoading(true);
        setError("");
        setOrdersError("");

        const [profileData, ordersData] = await Promise.all([
          getCustomerProfile(),
          getOrders().catch((ordersRequestError) => {
            setOrdersError(ordersRequestError.message);
            return [];
          }),
        ]);

        if (ignore) return;

        setProfile(profileData);
        setOrders(ordersData);
      } catch (requestError) {
        if (!ignore) setError(requestError.message);
      } finally {
        if (!ignore) {
          setLoading(false);
          setOrdersLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  function handleUpdate(updatedProfile) {
    setProfile(updatedProfile);
  }

  function handleRepeatOrder(order) {
    if (!order.items.length) return;

    order.items.forEach((item) => {
      addToCart({
        id: item.id || `${order.id}-${item.name}`,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.quantity,
      });
    });

    toast.success("Pedido adicionado ao carrinho");
  }

  return (
    <>
      <PerfilUsuario
        usuario={profile}
        loading={loading}
        error={error}
        orders={orders}
        ordersLoading={ordersLoading}
        ordersError={ordersError}
        onEdit={() => setOpenModal(true)}
        onRepeatOrder={handleRepeatOrder}
      />

      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        usuario={profile}
        onUpdate={handleUpdate}
      />
    </>
  );
};
