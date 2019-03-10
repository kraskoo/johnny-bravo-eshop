import Navbar from "./Navbar/Navbar";
import Footer from '../Common/Footer/Footer';
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const NavbarWithUserContext = withConsumer(Navbar, UserConsumer);

export {
  NavbarWithUserContext,
  Footer
};