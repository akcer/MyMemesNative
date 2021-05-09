import { Appearance } from 'react-native';

const isColorSchemeDark = Appearance.getColorScheme() === 'dark' ? true : false;

export default isColorSchemeDark;
