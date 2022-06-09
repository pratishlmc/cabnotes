import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    blue: "#0071e3",
    gray: "#86868b",
    darkGray: "#1d1d1f ",
  },
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme