import { CSSProperties } from 'react'

import { articleColors } from '@/helper/colors'

export const defaultContainerStyles: CSSProperties = {
  width: 786,
  height: 786,
  border: '1px solid black',
  position: 'relative',
}

export const azfLabelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
}

export const azfInputStyle: CSSProperties = {
  float: 'right',
}

export const answerZoneStyle: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `3px solid ${articleColors.blue}`,
  backgroundColor: 'white',
  cursor: 'move',
  minHeight: '55px',
  minWidth: '100px',
  padding: '5px',
}

export const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}

export const buttonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  backgroundColor: '#ffedd5',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
}

export const iconStyle: CSSProperties = {
  marginRight: '0.5rem',
}

export const labelStyle: CSSProperties = {
  ...azfLabelStyle,
  display: 'block',
  marginBottom: '0.5rem',
}

export const inputStyle: CSSProperties = {
  ...azfInputStyle,
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.5rem',
  backgroundColor: '#ffedd5',
  border: '1px solid #cccccc',
  borderRadius: '5px',
}

export const sizeContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginTop: '0.5rem',
}

export const spanStyle: CSSProperties = {
  alignSelf: 'center',
}

export const alignLabelStyle: CSSProperties = {
  ...azfLabelStyle,
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
}

export const checkboxStyle: CSSProperties = {
  marginLeft: 'auto',
  backgroundColor: '#ffedd5',
  border: '1px solid #cccccc',
  borderRadius: '5px',
}
