import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Circle,
  PlusCircle,
  List,
} from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("teachers"); // 'teachers' | 'add-teacher' | 'positions' | 'add-position'

  // States cho Giáo viên
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  // States cho Vị trí công tác
  const [positions, setPositions] = useState([]);
  const [loadingPositions, setLoadingPositions] = useState(true);

  // Form States cho Giáo viên (Yêu cầu 2.2)
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    identity: "",
    dob: "",
    startDate: "",
    isActive: true,
    selectedPositionId: "",
    degreeType: "",
    degreeSchool: "",
    degreeMajor: "",
    degreeYear: "",
  });

  // Form States cho Vị trí công tác (Yêu cầu 2.4)
  const [positionForm, setPositionForm] = useState({
    name: "",
    code: "",
    des: "",
    isActive: true,
  });

  const BACKEND_URL = "http://localhost:8888/api"; 

  // 1. Gọi API lấy danh sách giáo viên phân trang (Yêu cầu 2.1)
  const fetchTeachers = async (page = 1) => {
    setLoadingTeachers(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/teachers?page=${page}&limit=5`
      );
      setTeachers(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Lỗi lấy danh sách giáo viên:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  // 2. Gọi API lấy danh sách vị trí công tác (Yêu cầu 2.3)
  const fetchPositions = async () => {
    setLoadingPositions(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/teacher-positions`);
      setPositions(response.data);
    } catch (error) {
      console.error("Lỗi lấy vị trí công tác:", error);
    } finally {
      setLoadingPositions(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchPositions();
  }, []);

  // Handler: Tạo mới Vị trí công tác (Yêu cầu 2.4)
  const handlePositionSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/teacher-positions`, positionForm);
      alert("🎉 Tạo vị trí công tác mới thành công!");
      setPositionForm({ name: "", code: "", des: "", isActive: true });
      fetchPositions(); // Cập nhật lại danh sách
      setActiveTab("positions"); // Chuyển về tab xem danh sách vị trí
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  // Handler: Tạo mới Giáo viên (Yêu cầu 2.2)
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();

    // Cấu trúc lại dữ liệu mảng degrees và teacherPositions theo cấu trúc Model Backend yêu cầu
    const payload = {
      name: teacherForm.name,
      email: teacherForm.email,
      phoneNumber: teacherForm.phoneNumber,
      address: teacherForm.address,
      identity: teacherForm.identity,
      dob: teacherForm.dob,
      startDate: teacherForm.startDate,
      isActive: teacherForm.isActive,
      teacherPositions: teacherForm.selectedPositionId
        ? [teacherForm.selectedPositionId]
        : [],
      degrees: [
        {
          type: teacherForm.degreeType,
          school: teacherForm.degreeSchool,
          major: teacherForm.degreeMajor,
          year: parseInt(teacherForm.degreeYear),
          isGraduated: true,
        },
      ],
    };

    try {
      await axios.post(`${BACKEND_URL}/teachers`, payload);
      alert("🎉 Tạo mới thông tin giáo viên thành công!");
      // Reset form
      setTeacherForm({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        identity: "",
        dob: "",
        startDate: "",
        isActive: true,
        selectedPositionId: "",
        degreeType: "",
        degreeSchool: "",
        degreeMajor: "",
        degreeYear: "",
      });
      fetchTeachers();
      setActiveTab("teachers"); // Quay về trang danh sách giáo viên
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* HEADER SECTION */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              margin: 0,
              fontWeight: "700",
              color: "#f8fafc",
            }}
          >
            mindX{" "}
            <span style={{ color: "#3b82f6", fontWeight: "400" }}>
              Technology School
            </span>
          </h1>
          <p
            style={{ color: "#64748b", margin: "5px 0 0 0", fontSize: "14px" }}
          >
            Hệ thống quản lý thông tin giáo viên
          </p>
        </div>

        {/* THANH ĐIỀU HƯỚNG TABS KIỂU CÔNG NGHỆ */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn-electric"
            style={{
              background:
                activeTab === "teachers" ? "#2563eb" : "rgba(255,255,255,0.05)",
            }}
            onClick={() => setActiveTab("teachers")}
          >
            Danh sách GV
          </button>
          <button
            className="btn-electric"
            style={{
              background:
                activeTab === "add-teacher"
                  ? "#2563eb"
                  : "rgba(255,255,255,0.05)",
            }}
            onClick={() => setActiveTab("add-teacher")}
          >
            + Thêm GV
          </button>
          <button
            className="btn-electric"
            style={{
              background:
                activeTab === "positions"
                  ? "#2563eb"
                  : "rgba(255,255,255,0.05)",
            }}
            onClick={() => setActiveTab("positions")}
          >
            Vị trí công tác
          </button>
          <button
            className="btn-electric"
            style={{
              background:
                activeTab === "add-position"
                  ? "#2563eb"
                  : "rgba(255,255,255,0.05)",
            }}
            onClick={() => setActiveTab("add-position")}
          >
            + Thêm Vị trí
          </button>
        </div>
      </header>

      {/* TAB 1: DANH SÁCH GIÁO VIÊN (2.1) */}
      {activeTab === "teachers" && (
        <div
          className="glass-panel"
          style={{ padding: "20px", overflowX: "auto" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <Users size={20} color="#3b82f6" />
            <h2 style={{ fontSize: "18px", margin: 0, color: "#f1f5f9" }}>
              Danh sách Giáo viên
            </h2>
          </div>
          {loadingTeachers ? (
            <div
              style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}
            >
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Mã GV</th>
                    <th>Họ và tên</th>
                    <th>Liên hệ</th>
                    <th>Vị trí</th>
                    <th>Học vị</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td
                        style={{
                          fontFamily: "monospace",
                          color: "#3b82f6",
                          fontWeight: "600",
                        }}
                      >
                        {teacher.code}
                      </td>
                      <td>
                        <div style={{ fontWeight: "500", color: "#f8fafc" }}>
                          {teacher.userId?.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          CCCD: {teacher.userId?.identity}
                        </div>
                      </td>
                      <td>
                        <div>{teacher.userId?.email}</div>
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {teacher.userId?.phoneNumber}
                        </div>
                      </td>
                      <td>
                        {teacher.teacherPositions?.map((pos) => (
                          <span
                            key={pos._id}
                            style={{
                              display: "inline-block",
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#60a5fa",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              marginRight: "5px",
                            }}
                          >
                            {pos.name}
                          </span>
                        ))}
                      </td>
                      <td>
                        {teacher.degrees?.map((deg, i) => (
                          <div key={i} style={{ fontSize: "13px" }}>
                            {deg.type} - {deg.major}
                            <div style={{ fontSize: "11px", color: "#64748b" }}>
                              {deg.school} ({deg.year})
                            </div>
                          </div>
                        ))}
                      </td>
                      <td>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            color: teacher.isActive ? "#10b981" : "#ef4444",
                          }}
                        >
                          <Circle
                            size={8}
                            fill={teacher.isActive ? "#10b981" : "#ef4444"}
                            stroke="none"
                          />
                          {teacher.isActive ? "Hoạt động" : "Tạm dừng"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* PHÂN TRANG */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: "15px",
                }}
              >
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  Trang {pagination.currentPage} / {pagination.totalPages}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn-electric"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#f1f5f9",
                      padding: "6px 12px",
                    }}
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchTeachers(pagination.currentPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className="btn-electric"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#f1f5f9",
                      padding: "6px 12px",
                    }}
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => fetchTeachers(pagination.currentPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: TẠO MỚI GIÁO VIÊN (2.2) */}
      {activeTab === "add-teacher" && (
        <div className="glass-panel" style={{ padding: "25px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <PlusCircle size={20} color="#3b82f6" />
            <h2 style={{ fontSize: "18px", margin: 0, color: "#f1f5f9" }}>
              Thêm mới thông tin Giáo viên
            </h2>
          </div>
          <form
            onSubmit={handleTeacherSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Cột trái: Thông tin cá nhân */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#3b82f6",
                  margin: "0 0 5px 0",
                }}
              >
                1. Thông tin cá nhân
              </h3>
              <input
                style={inputStyle}
                type="text"
                placeholder="Họ và tên giáo viên"
                required
                value={teacherForm.name}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, name: e.target.value })
                }
              />
              <input
                style={inputStyle}
                type="email"
                placeholder="Địa chỉ Email (Duy nhất)"
                required
                value={teacherForm.email}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, email: e.target.value })
                }
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Số điện thoại"
                required
                value={teacherForm.phoneNumber}
                onChange={(e) =>
                  setTeacherForm({
                    ...teacherForm,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Địa chỉ thường trú"
                required
                value={teacherForm.address}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, address: e.target.value })
                }
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Số CMND/CCCD"
                required
                value={teacherForm.identity}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, identity: e.target.value })
                }
              />
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                Ngày sinh:{" "}
                <input
                  style={{ ...inputStyle, marginTop: "5px" }}
                  type="date"
                  required
                  value={teacherForm.dob}
                  onChange={(e) =>
                    setTeacherForm({ ...teacherForm, dob: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Cột phải: Công tác & Học vị */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  color: "#3b82f6",
                  margin: "0 0 5px 0",
                }}
              >
                2. Thông tin học vị & Công tác
              </h3>
              <select
                style={inputStyle}
                required
                value={teacherForm.selectedPositionId}
                onChange={(e) =>
                  setTeacherForm({
                    ...teacherForm,
                    selectedPositionId: e.target.value,
                  })
                }
              >
                <option value="" style={{ background: "#1e1b4b" }}>
                  -- Chọn Vị trí công tác --
                </option>
                {positions.map((pos) => (
                  <option
                    key={pos._id}
                    value={pos._id}
                    style={{ background: "#1e1b4b" }}
                  >
                    {pos.name} ({pos.code})
                  </option>
                ))}
              </select>
              <input
                style={inputStyle}
                type="text"
                placeholder="Loại bằng cấp (Cử nhân / Thạc sĩ / Tiến sĩ...)"
                required
                value={teacherForm.degreeType}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, degreeType: e.target.value })
                }
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Trường tốt nghiệp"
                required
                value={teacherForm.degreeSchool}
                onChange={(e) =>
                  setTeacherForm({
                    ...teacherForm,
                    degreeSchool: e.target.value,
                  })
                }
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Chuyên ngành học"
                required
                value={teacherForm.degreeMajor}
                onChange={(e) =>
                  setTeacherForm({
                    ...teacherForm,
                    degreeMajor: e.target.value,
                  })
                }
              />
              <input
                style={inputStyle}
                type="number"
                placeholder="Năm tốt nghiệp"
                required
                value={teacherForm.degreeYear}
                onChange={(e) =>
                  setTeacherForm({ ...teacherForm, degreeYear: e.target.value })
                }
              />
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                Ngày bắt đầu làm việc:{" "}
                <input
                  style={{ ...inputStyle, marginTop: "5px" }}
                  type="date"
                  required
                  value={teacherForm.startDate}
                  onChange={(e) =>
                    setTeacherForm({
                      ...teacherForm,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div
              style={{
                gridColumn: "1 / span 2",
                textAlign: "right",
                marginTop: "10px",
              }}
            >
              <button
                type="submit"
                className="btn-electric"
                style={{ padding: "10px 30px" }}
              >
                Lưu thông tin giáo viên
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: DANH SÁCH VỊ TRÍ CÔNG TÁC (2.3) */}
      {activeTab === "positions" && (
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <List size={20} color="#3b82f6" />
            <h2 style={{ fontSize: "18px", margin: 0, color: "#f1f5f9" }}>
              Danh sách Vị trí công tác
            </h2>
          </div>
          {loadingPositions ? (
            <div
              style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}
            >
              Đang tải dữ liệu vị trí...
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mã vị trí (Code)</th>
                  <th>Tên vị trí công tác</th>
                  <th>Mô tả công việc</th>
                  <th>Trạng thái sử dụng</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => (
                  <tr key={pos._id}>
                    <td
                      style={{
                        fontFamily: "monospace",
                        color: "#60a5fa",
                        fontWeight: "600",
                      }}
                    >
                      {pos.code}
                    </td>
                    <td style={{ fontWeight: "500", color: "#f8fafc" }}>
                      {pos.name}
                    </td>
                    <td style={{ color: "#94a3b8" }}>
                      {pos.des || "Không có mô tả"}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          color: pos.isActive ? "#10b981" : "#ef4444",
                        }}
                      >
                        <Circle
                          size={8}
                          fill={pos.isActive ? "#10b981" : "#ef4444"}
                          stroke="none"
                        />
                        {pos.isActive ? "Đang kích hoạt" : "Tạm dừng"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 4: TẠO MỚI VỊ TRÍ CÔNG TÁC (2.4) */}
      {activeTab === "add-position" && (
        <div
          className="glass-panel"
          style={{ padding: "25px", maxWidth: "600px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Briefcase size={20} color="#3b82f6" />
            <h2 style={{ fontSize: "18px", margin: 0, color: "#f1f5f9" }}>
              Tạo mới Vị trí công tác
            </h2>
          </div>
          <form
            onSubmit={handlePositionSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              style={inputStyle}
              type="text"
              placeholder="Tên vị trí công tác (Ví dụ: Giảng viên chính)"
              required
              value={positionForm.name}
              onChange={(e) =>
                setPositionForm({ ...positionForm, name: e.target.value })
              }
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Mã vị trí duy nhất (Ví dụ: GVC01)"
              required
              value={positionForm.code}
              onChange={(e) =>
                setPositionForm({ ...positionForm, code: e.target.value })
              }
            />
            <textarea
              style={{ ...inputStyle, height: "100px", resize: "none" }}
              placeholder="Mô tả tóm tắt vai trò công việc..."
              value={positionForm.des}
              onChange={(e) =>
                setPositionForm({ ...positionForm, des: e.target.value })
              }
            />

            <button
              type="submit"
              className="btn-electric"
              style={{ marginTop: "10px", padding: "12px" }}
            >
              Tạo vị trí công tác
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Inline Style cho các ô input kính mờ sang trọng
const inputStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "10px 14px",
  borderRadius: "8px",
  color: "#f8fafc",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

export default App;