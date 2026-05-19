const Card = ({ name, learningClass, slogan }) => {
    return (
        <div className="card-container">
            <h2>Tôi là: {name}</h2>
            <p className="class-name">Học lớp: {learningClass}</p>
            <p className="slogan">{slogan}</p>
        </div>
    )
}

export default Card; 