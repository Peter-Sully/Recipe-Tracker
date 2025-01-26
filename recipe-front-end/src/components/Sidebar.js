
import React, { useState } from 'react';

const Sidebar = ({ setSearch }) => {
  const [num, setNum] = useState(6);
  const [sort, setSort] = useState('Viewed');
  const [time, setTime] = useState('Day');

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Check if value is numeric
    if (!isNaN(value)) {
      setNum(value);
    } else {
      // Display alert if value is not numeric
      alert('Please enter a numeric value 1-15.');
    }
  };


  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSearch = () => {
    if (num > 15) {
      alert('Number is higher than 15');
      return;
    } else if (num < 1) {
      alert('Number is lower than 1');
      return;
    } 
    setSearch({ num, sort, time });
  };

  return (
    <div className="selection-box">
      <div className="search">
        <input
          type="text"
          placeholder="Enter a number 1-15"
          value={num}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Filter</h2>
      <h4>Sort By:</h4>
      <div className="selection">
        <input
          type="radio"
          id="most-viewed"
          name="sort"
          value="Viewed"
          checked={sort === 'Viewed'}
          onChange={handleSortChange}
        />
        <label htmlFor="most-viewed">Most Viewed</label>
        <br />
        <input
          type="radio"
          id="most-shared"
          name="sort"
          value="Shared"
          checked={sort === 'Shared'}
          onChange={handleSortChange}
        />
        <label htmlFor="most-shared">Most Shared</label>
        <br />
        <input
          type="radio"
          id="most-emailed"
          name="sort"
          value="Emailed"
          checked={sort === 'Emailed'}
          onChange={handleSortChange}
        />
        <label htmlFor="most-emailed">Most Emailed</label>
      </div>
      <h4>Time Frame:</h4>
      <div className="selection">
        <input
          type="radio"
          id="day"
          name="time"
          value="Day"
          checked={time === 'Day'}
          onChange={handleTimeChange}
        />
        <label htmlFor="day">Day</label>
        <br />
        <input
          type="radio"
          id="week"
          name="time"
          value="Week"
          checked={time === 'Week'}
          onChange={handleTimeChange}
        />
        <label htmlFor="week">Week</label>
        <br />
        <input
          type="radio"
          id="month"
          name="time"
          value="Month"
          checked={time === 'Month'}
          onChange={handleTimeChange}
        />
        <label htmlFor="month">Month</label>
      </div>
    </div>
  );
};

export default Sidebar;
