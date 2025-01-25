import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchCounters,addMerchant,removeMerchant,deleteCounterAsync} from '../slices/CounterSlice'

function CounterPage() {
  const dispatch = useDispatch();
  const { counters, loading, error } = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchCounters());
  }, [dispatch]);

  const handleAddMerchant = (counterId, merchantId) => {
    dispatch(addMerchant(counterId, merchantId));
  };

  const handleRemoveMerchant = (counterId, merchantId) => {
    dispatch(removeMerchant(counterId, merchantId));
  };

  const handleDeleteCounter = (counterId) => {
    dispatch(deleteCounterAsync(counterId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Counters</h1>
      <ul>
        {counters.map((counter) => (
          <li key={counter._id}>
            <h3>{counter.name}</h3>
            <p>Merchants: {counter.merchants.length}</p>

            <button onClick={() => handleAddMerchant(counter._id, 'merchantId')}>Add Merchant</button>
            <button onClick={() => handleRemoveMerchant(counter._id, 'merchantId')}>Remove Merchant</button>
            <button onClick={() => handleDeleteCounter(counter._id)}>Delete Counter</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CounterPage;
