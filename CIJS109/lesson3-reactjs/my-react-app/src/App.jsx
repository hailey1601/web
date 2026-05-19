import "./App.css";
import Card from "../components/Card.jsx";

function App() {
  const students = [
    {
      id: 1,
      name: "Nguyễn Văn Tài",
      learningClass: "Code Intensive",
      slogan: "Trở thành master coding là ước mơ của tôi",
    },
    {
      id: 2,
      name: "Trịnh Mẫn Nhi",
      learningClass: "Web Fullstack",
      slogan: "Học nữa, học mãi",
    },
    {
      id: 3,
      name: "Vũ Long Môn",
      learningClass: "Code For Everyone",
      slogan: "Quyết tâm thành thạo ReactJs",
    },
  ];

  return (
    <>
      <div className="app-container">
        {students.map((student) => (
          <Card
            key={student.id} 
            name={student.name}
            learningClass={student.learningClass}
            slogan={student.slogan}
          />
        ))}
      </div>
    </>
  );
}

export default App;
