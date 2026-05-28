import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const addToCart = async (productId) => {
    if (!user) return navigate("/login");
    try {
      await api.post("/cart", { productId, quantity: 1 });
      alert("Đã thêm vào giỏ hàng!");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi!");
    }
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <span style={s.logoIcon}>⚡</span>
          <span style={s.logoText}>
            MindX<span style={s.logoAccent}>Shop</span>
          </span>
        </div>
        <div style={s.navLinks}>
          {user ? (
            <>
              <span style={s.greeting}>
                Xin chào, <b>{user.email}</b>
              </span>
              {user.role === "customer" && (
                <>
                  <button style={s.navBtn} onClick={() => navigate("/cart")}>
                    🛒 Giỏ hàng
                  </button>
                  <button style={s.navBtn} onClick={() => navigate("/orders")}>
                    📦 Đơn hàng
                  </button>
                </>
              )}
              {user.role === "shop" && (
                <button style={s.navBtn} onClick={() => navigate("/shop")}>
                  🏪 Dashboard
                </button>
              )}
              {user.role === "admin" && (
                <button style={s.navBtn} onClick={() => navigate("/admin")}>
                  ⚙️ Admin
                </button>
              )}
              <button style={s.logoutBtn} onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button style={s.navBtn} onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
              <button style={s.accentBtn} onClick={() => navigate("/register")}>
                Đăng ký
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div style={s.hero}>
        <div style={s.heroContent}>
          <p style={s.heroSub}>🔥 Sản phẩm nổi bật</p>
          <h1 style={s.heroTitle}>
            Công nghệ đỉnh cao.
            <br />
            Giá tốt nhất.
          </h1>
          <button
            style={s.heroBtn}
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Khám phá ngay →
          </button>
        </div>
      </div>

      {/* Products */}
      <div id="products" style={s.section}>
        <h2 style={s.sectionTitle}>Sản phẩm</h2>
        <div style={s.grid}>
          {products.length === 0 ? (
            <p style={{ color: "#aaa" }}>Không có sản phẩm nào.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} style={s.card}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={s.img}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200/1a1a2e/00d4ff?text=No+Image")
                  }
                />
                <div style={s.cardBody}>
                  <p style={s.category}>{p.category?.name}</p>
                  <h3 style={s.productName}>{p.name}</h3>
                  <p style={s.desc}>{p.description}</p>
                  <div style={s.cardFooter}>
                    <span style={s.price}>{p.price.toLocaleString()}đ</span>
                    <span style={s.stock}>Còn {p.stock}</span>
                  </div>
                  {user?.role === "customer" && (
                    <button style={s.addBtn} onClick={() => addToCart(p._id)}>
                      + Thêm vào giỏ
                    </button>
                  )}
                  {!user && (
                    <button style={s.addBtn} onClick={() => navigate("/login")}>
                      Đăng nhập để mua
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <p>© 2026 MindXShop. All rights reserved.</p>
      </footer>
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
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: { fontSize: "24px" },
  logoText: { fontSize: "20px", fontWeight: "bold", color: "#fff" },
  logoAccent: { color: "#00d4ff" },
  navLinks: { display: "flex", alignItems: "center", gap: "12px" },
  greeting: { color: "#aaa", fontSize: "14px" },
  navBtn: {
    padding: "8px 16px",
    background: "transparent",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  accentBtn: {
    padding: "8px 16px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
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
  hero: {
    background: "linear-gradient(135deg, #11112a 0%, #1a1a3e 100%)",
    padding: "80px 40px",
    borderBottom: "1px solid #1e1e3f",
  },
  heroContent: { maxWidth: "600px" },
  heroSub: {
    color: "#00d4ff",
    fontSize: "14px",
    letterSpacing: "2px",
    marginBottom: "16px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: 1.2,
    marginBottom: "24px",
    color: "#fff",
  },
  heroBtn: {
    padding: "14px 32px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  section: { padding: "40px" },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "border-color 0.2s",
  },
  img: { width: "100%", height: "180px", objectFit: "cover" },
  cardBody: { padding: "16px" },
  category: {
    color: "#00d4ff",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#fff",
  },
  desc: {
    color: "#888",
    fontSize: "13px",
    marginBottom: "12px",
    lineHeight: 1.5,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  price: { color: "#00d4ff", fontWeight: "bold", fontSize: "18px" },
  stock: { color: "#555", fontSize: "12px" },
  addBtn: {
    width: "100%",
    padding: "10px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  footer: {
    textAlign: "center",
    padding: "24px",
    color: "#444",
    borderTop: "1px solid #1e1e3f",
  },
};

export default Home;
