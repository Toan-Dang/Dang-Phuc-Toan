import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ResultsTable({ data, fetchData }) {
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { authToken } = useAuth();

  const handleEditChange = (id, field, value) => {
    setEditedData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

  const handleEditToggle = () => {
    setEditable(prevEditable => !prevEditable);
  };

  const handleSaveAll = async () => {
    try {
      // Combine editedData with original data
      const updatedData = data.map(person => ({
        ...person,
        ...editedData[person.id],
      }));
      const response = await fetch('https://np0gqaxmz1.execute-api.us-west-2.amazonaws.com/dev/person/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        // Refresh data without reloading the page
        await fetchData();
        setEditedData({});
        setEditable(false);
      } else {
        throw new Error('Failed to update records');
      }
    } catch (error) {
      console.error('Error updating records:', error);
    }
  };
  

  return (
    <>
      <button onClick={editable ? handleSaveAll : handleEditToggle}>
        {editable ? 'Save All' : 'Edit'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(person => (
            <tr key={person.id}>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editedData[person.id]?.username || person.username}
                    onChange={e => handleEditChange(person.id, 'username', e.target.value)}
                  />
                ) : (
                  person.username
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editedData[person.id]?.email || person.email}
                    onChange={e => handleEditChange(person.id, 'email', e.target.value)}
                  />
                ) : (
                  person.email
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editedData[person.id]?.birthdate || person.birthdate}
                    onChange={e => handleEditChange(person.id, 'birthdate', e.target.value)}
                  />
                ) : (
                  person.birthdate
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ResultsTable;
