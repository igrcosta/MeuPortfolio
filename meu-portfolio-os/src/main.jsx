import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './index.css'
import App from './App.jsx'
import { cor, fonte, raio } from './theme/tokens'

// Tema da Material UI ligado aos tokens do IgorOS: os componentes MUI seguem a mesma identidade visual
const tema = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: cor.destaque, light: cor.destaqueClaro, contrastText: cor.preto },
    error: { main: cor.vermelho },
    success: { main: cor.verde },
    background: { default: cor.preto, paper: 'rgba(24, 24, 24, 0.92)' },
    text: { primary: cor.texto, secondary: cor.textoSecundario },
    divider: cor.divisoria
  },
  typography: { fontFamily: fonte.familia },
  shape: { borderRadius: 12 },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: cor.superficie,
          borderRadius: raio.md,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: cor.borda },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.25)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: cor.destaqueClaro }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: cor.textoSecundario, '&.Mui-focused': { color: cor.destaqueClaro } } }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: raio.pilula, textTransform: 'none', fontWeight: 600, paddingInline: 20, boxShadow: 'none' }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: { root: { backgroundColor: cor.divisoria } }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
