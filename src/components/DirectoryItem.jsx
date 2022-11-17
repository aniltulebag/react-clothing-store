import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category: { title, imageUrl, route } }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={navigate.bind(null, route)}
      className="directory-item-container group"
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
