import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "shop") navigate("/shop");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.logo}>
          ⚡ <span style={{ color: "#00d4ff" }}>MindX</span>Shop
        </div>
        <h2 style={s.title}>Đăng nhập</h2>
        {error && <p style={s.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button style={s.btn} type="submit">
            Đăng nhập
          </button>
        </form>
        <p style={s.link}>
          Chưa có tài khoản?{" "}
          <Link to="/register" style={{ color: "#00d4ff" }}>
            Đăng ký
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

export default Login;
