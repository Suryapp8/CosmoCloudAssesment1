import React, { useState } from 'react';
import "./Form.css"

const DynamicForm = ({ initialFields }) => {
  const [fields, setFields] = useState(initialFields || []);
  
  const handleFieldTypeChange = (index, event) => {
    const newFields = [...fields];
    if (newFields[index]) {
      newFields[index].type = event.target.value;
      setFields(newFields);
    }
  };

  const handleNestedFieldTypeChange = (parentIndex, nestedIndex, event) => {
    const newFields = [...fields];
    newFields[parentIndex].nestedFields[nestedIndex].type = event.target.value;
    setFields(newFields);
  };

  const handleFieldNameChange = (parentIndex, nestedIndex, event) => {
    const newFields = [...fields];
    const nestedFields = newFields[parentIndex]?.nestedFields;
    if (nestedFields && nestedFields[nestedIndex]) {
      nestedFields[nestedIndex].name = event.target.value;
      setFields(newFields);
    } else if (newFields[parentIndex]) {
      newFields[parentIndex].name = event.target.value;
      setFields(newFields);
    }
  };
  

  

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'string', nestedFields: [] }]);
  };

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleAddNestedField = (index) => {
    const newFields = [...fields];
    newFields[index].nestedFields.push({ name: '', type: 'string' });
    setFields(newFields);
  };

  const handleDeleteNestedField = (parentIndex, nestedIndex) => {
    const newFields = [...fields];
    newFields[parentIndex].nestedFields.splice(nestedIndex, 1);
    setFields(newFields);
  };

  const handleSave = () => {
    console.log(fields);
  };

  return (
  <>
  <div className='add-btn-container'> 
  <button className='add-btn' onClick={handleAddField}>+</button>
  </div>
    
    <div className='container'>
      
    
      {fields && fields.map((field, index) => (
        <div className='form-row' key={index} >
          <div className='form-manage'>
          <input 
  type="text" 
  value={field.name} 
  onChange={(event) => handleFieldNameChange(index, undefined, event)} 
/>

          <select value={field.type} onChange={(event) => handleFieldTypeChange(index, event)}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
          </select>
          <div className='icons'>
          <label className="switch">
  <input type="checkbox" />
  <span className="slider round"></span>
</label>
            <img onClick={() => handleDeleteField(index)} className='icon' src="https://cdn-icons-png.flaticon.com/512/2907/2907762.png" alt="delete icon" />
          
          </div>
          </div>
          {field.type === 'object'  && (
            <div >
              {field.nestedFields.map((nestedField, nestedIndex) => (
                <div  className='new-object' key={nestedIndex}>
                  <div className='form-manage2'>
                  <input type="text" value={nestedField.name} onChange={(event) => handleFieldNameChange(index, nestedIndex, event)} />
                  <select value={nestedField.type} onChange={(event) => handleNestedFieldTypeChange(index, nestedIndex, event)}>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                  </select>
                  <button onClick={() => handleDeleteNestedField(index, nestedIndex)}>-</button>
                  <button onClick={() => handleAddNestedField(index)}>+ </button>
                  </div>
                  
                  
                </div>
              ))}
              <button className='add-object-btn' onClick={() => handleAddNestedField(index)}>Add </button>
            </div>
          )}
          
          
        </div>
      ))}
      
      {
        fields.length > 0 ? <button className='save-btn' onClick={handleSave}>Save</button> : <h1>Click "+" to add new field</h1>
      }
      
    </div>
    </>
  );
};

export default DynamicForm;