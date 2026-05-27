import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      api.get("/products/all").catch(() => ({ data: [] })),
      api.get("/products/category"),
    ]);
    setProducts(prodRes.data);
    setCategories(catRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveProduct = async (productId) => {
    try {
      await api.patch(`/products/approve/${productId}`, { status: "active" });
      setMessage("✅ Đã duyệt sản phẩm!");
      fetchData();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Lỗi!"));
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/category", catForm);
      setMessage("✅ Tạo danh mục thành công!");
      setCatForm({ name: "", description: "" });
      fetchData();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Lỗi!"));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const pendingProducts = products.filter((p) => p.status === "pending");
  const activeProducts = products.filter((p) => p.status === "active");

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
        <h2 style={s.title}>⚙️ Admin Dashboard</h2>

        {message && (
          <p
            style={{
              color: message.startsWith("✅") ? "#4caf50" : "#ff4d4d",
              marginBottom: "16px",
            }}
          >
            {message}
          </p>
        )}

        {/* Stats */}
        <div style={s.stats}>
          <div style={s.statCard}>
            <p style={s.statLabel}>Chờ duyệt</p>
            <p style={s.statNum}>{pendingProducts.length}</p>
          </div>
          <div style={s.statCard}>
            <p style={s.statLabel}>Đang bán</p>
            <p style={s.statNum}>{activeProducts.length}</p>
          </div>
          <div style={s.statCard}>
            <p style={s.statLabel}>Danh mục</p>
            <p style={s.statNum}>{categories.length}</p>
          </div>
        </div>

        {/* Tạo danh mục */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>➕ Tạo danh mục mới</h3>
          <form onSubmit={createCategory} style={s.row}>
            <input
              style={s.input}
              placeholder="Tên danh mục"
              value={catForm.name}
              onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
              required
            />
            <input
              style={s.input}
              placeholder="Mô tả"
              value={catForm.description}
              onChange={(e) =>
                setCatForm({ ...catForm, description: e.target.value })
              }
            />
            <button style={s.accentBtn} type="submit">
              Tạo
            </button>
          </form>

          {categories.length > 0 && (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {categories.map((c) => (
                <span key={c._id} style={s.catBadge}>
                  {c.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Duyệt sản phẩm */}
        <div style={s.card}>
          <div style={s.tabs}>
            <button
              style={activeTab === "pending" ? s.tabActive : s.tab}
              onClick={() => setActiveTab("pending")}
            >
              Chờ duyệt ({pendingProducts.length})
            </button>
            <button
              style={activeTab === "active" ? s.tabActive : s.tab}
              onClick={() => setActiveTab("active")}
            >
              Đang bán ({activeProducts.length})
            </button>
          </div>

          <table style={s.table}>
            <thead>
              <tr>
                {[
                  "Tên sản phẩm",
                  "Danh mục",
                  "Giá",
                  "Tồn kho",
                  "Shop",
                  activeTab === "pending" ? "Hành động" : "Trạng thái",
                ].map((h) => (
                  <th key={h} style={s.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(activeTab === "pending" ? pendingProducts : activeProducts).map(
                (p) => (
                  <tr key={p._id} style={s.tr}>
                    <td style={s.td}>{p.name}</td>
                    <td style={s.td}>{p.category?.name}</td>
                    <td style={s.td}>{p.price?.toLocaleString()}đ</td>
                    <td style={s.td}>{p.stock}</td>
                    <td style={s.td}>{p.store?.email}</td>
                    <td style={s.td}>
                      {activeTab === "pending" ? (
                        <button
                          style={s.approveBtn}
                          onClick={() => approveProduct(p._id)}
                        >
                          ✓ Duyệt
                        </button>
                      ) : (
                        <span style={s.activeBadge}>Active</span>
                      )}
                    </td>
                  </tr>
                )
              )}
              {(activeTab === "pending" ? pendingProducts : activeProducts)
                .length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ ...s.td, textAlign: "center", color: "#888" }}
                  >
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  title: { fontSize: "24px", marginBottom: "24px" },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
  },
  statLabel: { color: "#888", fontSize: "13px", marginBottom: "8px" },
  statNum: { color: "#00d4ff", fontSize: "32px", fontWeight: "bold" },
  card: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
  },
  cardTitle: { fontSize: "18px", marginBottom: "16px", color: "#00d4ff" },
  row: { display: "flex", gap: "12px" },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #1e1e3f",
    background: "#0d0d1a",
    color: "#fff",
    fontSize: "14px",
  },
  accentBtn: {
    padding: "12px 24px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  catBadge: {
    padding: "6px 14px",
    background: "rgba(0,212,255,0.1)",
    color: "#00d4ff",
    borderRadius: "20px",
    fontSize: "13px",
    border: "1px solid rgba(0,212,255,0.3)",
  },
  tabs: { display: "flex", gap: "8px", marginBottom: "20px" },
  tab: {
    padding: "8px 20px",
    background: "transparent",
    color: "#888",
    border: "1px solid #1e1e3f",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  tabActive: {
    padding: "8px 20px",
    background: "rgba(0,212,255,0.1)",
    color: "#00d4ff",
    border: "1px solid #00d4ff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
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
  approveBtn: {
    padding: "6px 14px",
    background: "rgba(76,175,80,0.15)",
    color: "#4caf50",
    border: "1px solid #4caf50",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  activeBadge: {
    padding: "4px 10px",
    background: "rgba(76,175,80,0.15)",
    color: "#4caf50",
    borderRadius: "20px",
    fontSize: "12px",
    border: "1px solid #4caf50",
  },
};

export default AdminDashboard;
