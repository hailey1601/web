import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/cart/orders").then((res) => setOrders(res.data));
  }, []);

  const statusColor = (status) => {
    const map = {
      pending: "#f5a623",
      confirmed: "#00d4ff",
      shipping: "#7b68ee",
      delivered: "#4caf50",
      cancelled: "#ff4d4d",
    };
    return map[status] || "#888";
  };

  const statusLabel = (status) => {
    const map = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipping: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return map[status] || status;
  };

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo} onClick={() => navigate("/")}>
          ⚡ <span style={{ color: "#00d4ff" }}>MindX</span>Shop
        </div>
        <button style={s.backBtn} onClick={() => navigate("/")}>
          ← Về trang chủ
        </button>
      </nav>

      <div style={s.container}>
        <h2 style={s.title}>📦 Đơn hàng của tôi</h2>

        {orders.length === 0 ? (
          <div style={s.empty}>
            <p>Chưa có đơn hàng nào!</p>
            <button style={s.accentBtn} onClick={() => navigate("/")}>
              Mua sắm ngay
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <p style={s.orderId}>
                    Đơn hàng:{" "}
                    <span style={{ color: "#00d4ff" }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </p>
                  <p style={s.date}>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      ...s.statusBadge,
                      color: statusColor(order.status),
                      borderColor: statusColor(order.status),
                    }}
                  >
                    {statusLabel(order.status)}
                  </span>
                  <p style={s.totalPrice}>
                    {order.totalPrice?.toLocaleString()}đ
                  </p>
                </div>
              </div>

              <div style={s.divider} />

              {order.items.map((item) => (
                <div key={item._id} style={s.itemRow}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    style={s.img}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/60x60/11112a/00d4ff?text=SP")
                    }
                  />
                  <div style={s.itemInfo}>
                    <p style={s.itemName}>{item.product?.name}</p>
                    <p style={s.itemPrice}>
                      {item.price?.toLocaleString()}đ x {item.quantity}
                    </p>
                  </div>
                  <p style={s.itemTotal}>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                </div>
              ))}

              <div style={s.divider} />
              <p style={s.address}>📍 {order.shippingAddress}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    background: "#0d0d1a",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "#11112a",
    borderBottom: "1px solid #1e1e3f",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
  },
  backBtn: {
    padding: "8px 16px",
    background: "transparent",
    color: "#00d4ff",
    border: "1px solid #00d4ff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  container: { maxWidth: "800px", margin: "0 auto", padding: "40px 20px" },
  title: { fontSize: "24px", marginBottom: "24px" },
  empty: { textAlign: "center", padding: "60px", color: "#888" },
  accentBtn: {
    padding: "12px 24px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "16px",
  },
  card: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  orderId: { fontSize: "14px", color: "#aaa", marginBottom: "4px" },
  date: { fontSize: "13px", color: "#666" },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    border: "1px solid",
    borderRadius: "20px",
    fontSize: "12px",
    marginBottom: "8px",
  },
  totalPrice: { color: "#00d4ff", fontWeight: "bold", fontSize: "18px" },
  divider: { borderTop: "1px solid #1e1e3f", margin: "16px 0" },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: "14px", marginBottom: "4px" },
  itemPrice: { color: "#888", fontSize: "13px" },
  itemTotal: { color: "#00d4ff", fontWeight: "bold" },
  address: { color: "#888", fontSize: "13px" },
};

export default Orders;
