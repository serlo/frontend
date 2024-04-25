export const buttonsContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '200px', // Adjust the width as needed
  minHeight: '80px', // Adjust the height as needed
  border: '2px solid #007acc', // Border color similar to the image
  borderRadius: '5px',
  backgroundColor: '#ffffff', // White background
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
}

export const plusButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px', // Adjust the width as needed
  height: '50px', // Adjust the height as needed
  backgroundColor: '#ffedd5', // Light orange background
  borderRadius: '10px', // Rounded corners
  fontSize: '24px', // Size of the plus sign
  color: '#000000', // Black plus sign
}

export const settingsButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px', // Adjust the position as needed
  right: '10px', // Adjust the position as needed
  width: '20px', // Adjust the width as needed
  height: '20px', // Adjust the height as needed
  backgroundImage: 'url("path-to-settings-icon.png")', // Replace with the actual path to the settings icon
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
}
