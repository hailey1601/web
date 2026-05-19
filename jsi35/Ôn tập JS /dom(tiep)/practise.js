const DATA = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 55,
      birthdate: "1970-01-11",
      occupation: "Kỹ sư",
      nationality: "Việt Nam",
      address: "Hà Nội",
      gender: "Nam",
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 24,
      birthdate: "2001-12-12",
      occupation: "Bác sĩ",
      nationality: "Việt Nam",
      address: "TP. Hồ Chí Minh",
      gender: "Nữ",
    },
    {
      id: 3,
      name: "Lê Văn C",
      age: 57,
      birthdate: "1968-03-24",
      occupation: "Giáo viên",
      nationality: "Việt Nam",
      address: "Đà Nẵng",
      gender: "Nam",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      age: 53,
      birthdate: "1972-01-07",
      occupation: "Lập trình viên",
      nationality: "Việt Nam",
      address: "Hải Phòng",
      gender: "Nữ",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      age: 44,
      birthdate: "1981-04-24",
      occupation: "Nhà báo",
      nationality: "Việt Nam",
      address: "Cần Thơ",
      gender: "Nam",
    },
    {
      id: 6,
      name: "Bùi Thị F",
      age: 24,
      birthdate: "2001-12-24",
      occupation: "Nhà thiết kế",
      nationality: "Việt Nam",
      address: "Huế",
      gender: "Nữ",
    },
    {
      id: 7,
      name: "Đặng Văn G",
      age: 42,
      birthdate: "1982-12-09",
      occupation: "Doanh nhân",
      nationality: "Việt Nam",
      address: "Nha Trang",
      gender: "Nam",
    },
    {
      id: 8,
      name: "Vũ Thị H",
      age: 23,
      birthdate: "2002-08-17",
      occupation: "Cảnh sát",
      nationality: "Việt Nam",
      address: "Vũng Tàu",
      gender: "Nữ",
    },
    {
      id: 9,
      name: "Đỗ Văn I",
      age: 41,
      birthdate: "1984-09-21",
      occupation: "Luật sư",
      nationality: "Việt Nam",
      address: "Bắc Ninh",
      gender: "Nam",
    },
    {
      id: 10,
      name: "Phan Thị J",
      age: 34,
      birthdate: "1990-12-07",
      occupation: "Nhạc sĩ",
      nationality: "Việt Nam",
      address: "Thanh Hóa",
      gender: "Nữ",
    },
  ];   

  function createIdCard(person) {
    let card = document.createElement('div');
    card.className = 'id-card';
    card.innerHTML = `
        <img src="https://placehold.co/600x400" alt="Profile Picture" />
        <div class="details">
            <div>
                <span class="label">Name:</span> <span>${person.name}</span>
            </div>
            <div>
                <span class="label">Gender:</span> <span>${person.gender}</span>
            </div>
            <div class="row">
                <div>
                    <span class="label">Birthdate:</span>
                    <span>${person.birthdate}</span>
                </div>
                <div>
                    <span class="label">Age:</span> <span>${person.age}</span>
                </div>
            </div>
            <div>
                <span class="label">Occupation:</span>
                <span>${person.occupation}</span>
            </div>
            <div>
                <span class="label">Nationality:</span>
                <span>${person.nationality}</span>
            </div>
            <div>
                <span class="label">Address:</span> <span>${person.address}</span>
            </div>
        </div>
    `;
    return card;
}

for (let i = 0; i < DATA.length; i++) {
    let idCard = createIdCard(DATA[i]);
    document.body.appendChild(idCard);
}