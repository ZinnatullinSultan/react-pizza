import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchOnePizza() {
      try {
        const { data } = await axios.get(
          'https://6793995b5eae7e5c4d8f3eb3.mockapi.io/pizza/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка получения данных');
        navigate('/')
      }
    }
    fetchOnePizza();
  }, []);

  if (!pizza) {
    return <h1 className="container">Загрузка...</h1>;
  }
  return (
    <div className="container">
      <div className="pizza__inner">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
