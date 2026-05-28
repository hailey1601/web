import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Cart() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", getAuthConfig()); 
      setCart(res.data.cart);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`, getAuthConfig()); 
      fetchCart();
    } catch (err) {
      alert("Lỗi xóa sản phẩm!");
    }
  };

  const checkout = async () => {
    if (!address) return alert("Vui lòng nhập địa chỉ giao hàng!");
    try {
      await api.post("/orders/checkout", { shippingAddress: address }, getAuthConfig());
      alert("Đặt hàng thành công!");
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đặt hàng!");
    }
  };

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo} onClick={() => navigate("/")}>
          ⚡ <span style={{ color: "#00d4ff" }}>MindX</span>Shop
        </div>
        <button style={s.backBtn} onClick={() => navigate("/")}>
          ← Tiếp tục mua sắm
        </button>
      </nav>

      <div style={s.container}>
        <h2 style={s.title}>🛒 Giỏ hàng</h2>

        {!cart || cart.items.length === 0 ? (
          <div style={s.empty}>
            <p>Giỏ hàng trống!</p>
            <button style={s.accentBtn} onClick={() => navigate("/")}>
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div style={s.layout}>
            <div style={s.itemList}>
              {cart.items.map((item) => (
                <div key={item._id} style={s.card}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    style={s.img}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/80x80/11112a/00d4ff?text=SP")
                    }
                  />
                  <div style={s.info}>
                    <h3 style={s.productName}>{item.product?.name}</h3>
                    <p style={s.price}>{item.price?.toLocaleString()}đ</p>
                    <p style={s.qty}>Số lượng: {item.quantity}</p>
                  </div>
                  <div style={s.right}>
                    <p style={s.subtotal}>
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                    <button
                      style={s.removeBtn}
                      onClick={() => removeItem(item._id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={s.summary}>
              <h3 style={s.summaryTitle}>Thanh toán</h3>
              <div style={s.totalRow}>
                <span style={{ color: "#aaa" }}>Tổng cộng:</span>
                <span style={s.totalPrice}>{total.toLocaleString()}đ</span>
              </div>
              <input
                style={s.input}
                placeholder="Địa chỉ giao hàng"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button style={s.checkoutBtn} onClick={checkout}>
                Đặt hàng ngay
              </button>
            </div>
          </div>
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
  container: { maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" },
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
  layout: { display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" },
  itemList: { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    display: "flex",
    gap: "16px",
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "16px",
    alignItems: "center",
  },
  img: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: { flex: 1 },
  productName: { fontSize: "16px", marginBottom: "6px" },
  price: { color: "#00d4ff", fontSize: "14px" },
  qty: { color: "#888", fontSize: "13px", marginTop: "4px" },
  right: { textAlign: "right" },
  subtotal: {
    color: "#00d4ff",
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "8px",
  },
  removeBtn: {
    padding: "6px 12px",
    background: "transparent",
    color: "#ff4d4d",
    border: "1px solid #ff4d4d",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  summary: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "24px",
    height: "fit-content",
  },
  summaryTitle: { fontSize: "18px", marginBottom: "20px" },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  totalPrice: { color: "#00d4ff", fontWeight: "bold", fontSize: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #1e1e3f",
    background: "#0d0d1a",
    color: "#fff",
    boxSizing: "border-box",
    fontSize: "14px",
    marginBottom: "12px",
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Cart;