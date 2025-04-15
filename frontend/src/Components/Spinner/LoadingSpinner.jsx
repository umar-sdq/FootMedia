import './LoadingSpinner.css'; 
const Spinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <div className="spinner"></div>
  </div>
);

export default Spinner;
