import type {Preview} from '@storybook/react-vite';
import '../src/styles.css';
const preview:Preview={
 parameters:{
  layout:'padded',
  controls:{expanded:true},
  a11y:{test:'todo'},
  options:{storySort:{order:['Start here','Foundations','Components','Patterns','Reference']}},
 },
 tags:['autodocs'],
};
export default preview;
