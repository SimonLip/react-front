import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './Earnings.module.css'

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('грн');

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/earnings');
        setEarnings(response.data);
      } catch (error) {
        console.error('Помилка отримання даних про доходи:', error);
      }
    };

    fetchEarnings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEarning = { source, amount, currency };

    try {
      await axios.post('http://localhost:4000/api/earnings/add', newEarning);
      setEarnings([...earnings, newEarning]);
      setSource('');
      setAmount('');
    } catch (error) {
      console.error('Помилка додавання доходу:', error);
    }
  };

  return (
    <div className={s.wrapper}>
      <h2>Доходи:</h2>
      <form onSubmit={handleSubmit}>
        <input className={s.input} type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Джерело" required />
        <div>
        <input className={s.input} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Сума" required />
        </div>
        <div>
        <select className={s.select} value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="грн">Гривень</option>
          <option value="USD">Доларів</option>
          <option value="EUR">Євро</option>
        </select>
        </div>
        <div>
        <button className={s.submit} type="submit">Додати дохід</button>
        </div>
      </form>
    </div>
  );
};

export default Earnings;
