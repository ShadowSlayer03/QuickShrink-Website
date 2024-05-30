import React from 'react';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="custom-datepicker-input"
    onClick={onClick}
    ref={ref}
    style={{
      fontFamily: 'Outfit, sans-serif',
      backgroundColor: 'transparent',
      color: '#f0f0f0',
      padding: '0px 5px',
      borderRadius: '4px',
      width: '100%',
      textAlign: 'left',
    }}
  >
    {value || 'Select a date'}
  </button>
));

export default CustomInput;