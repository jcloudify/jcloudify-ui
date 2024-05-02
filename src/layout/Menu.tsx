import {Menu as RAMenu, MenuProps as RAMenuProps} from "react-admin";

// customization styles
// const sx = {
//  root: (theme: Theme) => ({
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     paddingBottom: (props?: {addPadding?: boolean}) => (props?.addPadding ? '80px' : '20px'),
//   }),
//   open: {
//     width: 240,
//   },
//   closed: {
//     width: 55,
//   },
//   active: (theme: Theme) => ({
//     color: theme.palette.text.primary,
//     fontWeight: 'bold',
//   }),
// }

export const Menu: React.FC<RAMenuProps> = (props) => <RAMenu {...props} />;
