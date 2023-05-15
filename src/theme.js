import { extendTheme } from '@chakra-ui/react';
import '@fontsource/rubik/700.css';
import '@fontsource/source-sans-pro/400.css';

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

const fonts = {
    heading: `'Rubik', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
}

const theme = extendTheme({ colors, fonts });
export default theme;
