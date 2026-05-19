const ShowUserInfo = ({ name, mail }) => {
  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Tên: {name}</p>
      <p>Email: {mail}</p>
    </div>
  );
};

export default ShowUserInfo;
