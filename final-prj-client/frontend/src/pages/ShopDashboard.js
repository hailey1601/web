import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ShopDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchMyProducts = () => {
    api.get("/products/my-products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    api.get("/products/category").then((res) => setCategories(res.data));
    fetchMyProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setMessage("✅ Đăng sản phẩm thành công! Chờ Admin duyệt.");
      setForm({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });
      fetchMyProducts();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Lỗi!"));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo} onClick={() => navigate("/")}>
          ⚡ <span style={{ color: "#00d4ff" }}>MindX</span>Shop
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={s.backBtn} onClick={() => navigate("/")}>
            ← Trang chủ
          </button>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </nav>

      <div style={s.container}>
        <h2 style={s.title}>🏪 Shop Dashboard</h2>

        {/* Form đăng sản phẩm */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Đăng sản phẩm mới</h3>
          {message && (
            <p
              style={{
                color: message.startsWith("✅") ? "#4caf50" : "#ff4d4d",
                marginBottom: "12px",
              }}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div style={s.grid2}>
              <select
                style={s.input}
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                style={s.input}
                placeholder="Tên sản phẩm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                style={s.input}
                placeholder="Giá (VNĐ)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                style={s.input}
                placeholder="Số lượng tồn kho"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
            </div>
            <textarea
              style={s.textarea}
              placeholder="Mô tả sản phẩm"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
            />
            <input
              style={s.input}
              placeholder="Link ảnh sản phẩm"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <button style={s.submitBtn} type="submit">
              Đăng sản phẩm
            </button>
          </form>
        </div>

        {/* Danh sách sản phẩm */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Sản phẩm của tôi</h3>
          {products.length === 0 ? (
            <p style={{ color: "#888" }}>Chưa có sản phẩm nào được duyệt.</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["Tên", "Danh mục", "Giá", "Tồn kho", "Trạng thái"].map(
                    (h) => (
                      <th key={h} style={s.th}>
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={s.tr}>
                    <td style={s.td}>{p.name}</td>
                    <td style={s.td}>{p.category?.name}</td>
                    <td style={s.td}>{p.price?.toLocaleString()}đ</td>
                    <td style={s.td}>{p.stock}</td>
                    <td style={s.td}>
                      {p.status === "active" && (
                        <span style={{ ...s.badge, ...s.badgeActive }}>Active</span>
                      )}
                      {p.status === "pending" && (
                        <span style={{ ...s.badge, ...s.badgePending }}>Pending</span>
                      )}
                      {p.status === "hidden" && (
                        <span style={{ ...s.badge, ...s.badgeHidden }}>Hidden</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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
  logoutBtn: {
    padding: "8px 16px",
    background: "transparent",
    color: "#ff4d4d",
    border: "1px solid #ff4d4d",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  container: { maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" },
  title: { fontSize: "24px", marginBottom: "24px" },
  card: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
  },
  cardTitle: { fontSize: "18px", marginBottom: "20px", color: "#00d4ff" },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #1e1e3f",
    background: "#0d0d1a",
    color: "#fff",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #1e1e3f",
    background: "#0d0d1a",
    color: "#fff",
    boxSizing: "border-box",
    fontSize: "14px",
    marginBottom: "12px",
    resize: "vertical",
  },
  submitBtn: {
    padding: "12px 24px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "12px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "12px",
    color: "#888",
    fontSize: "13px",
    borderBottom: "1px solid #1e1e3f",
  },
  tr: { borderBottom: "1px solid #1e1e3f" },
  td: { padding: "12px", fontSize: "14px" },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  badgeActive: {
    background: "rgba(76, 175, 80, 0.15)",
    color: "#4caf50",
    border: "1px solid #4caf50",
  },
  badgePending: {
    background: "rgba(255, 152, 0, 0.15)",
    color: "#ff9800",
    border: "1px solid #ff9800",
  },
  badgeHidden: {
    background: "rgba(158, 158, 158, 0.15)",
    color: "#9e9e9e",
    border: "1px solid #9e9e9e",
  },
};

export default ShopDashboard;
