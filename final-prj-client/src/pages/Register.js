import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.logo}>
          ⚡ <span style={{ color: "#00d4ff" }}>MindX</span>Shop
        </div>
        <h2 style={s.title}>Tạo tài khoản</h2>
        {error && <p style={s.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={s.input}
            placeholder="Họ tên"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={s.input}
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            style={s.input}
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            style={s.input}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Khách hàng</option>
            <option value="shop">Shop</option>
          </select>
          <button style={s.btn} type="submit">
            Đăng ký
          </button>
        </form>
        <p style={s.link}>
          Đã có tài khoản?{" "}
          <Link to="/login" style={{ color: "#00d4ff" }}>
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#0d0d1a",
  },
  box: {
    background: "#11112a",
    border: "1px solid #1e1e3f",
    borderRadius: "12px",
    padding: "40px",
    width: "380px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "24px",
    textAlign: "center",
  },
  title: { color: "#fff", marginBottom: "24px", textAlign: "center" },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #1e1e3f",
    background: "#0d0d1a",
    color: "#fff",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#00d4ff",
    color: "#0d0d1a",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "12px",
  },
  error: { color: "#ff4d4d", fontSize: "13px", marginBottom: "12px" },
  link: {
    color: "#888",
    textAlign: "center",
    marginTop: "16px",
    fontSize: "14px",
  },
};

export default Register;
