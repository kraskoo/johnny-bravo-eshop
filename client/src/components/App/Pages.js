import Home from "../Home/Home";
import NotFound from '../NotFound/NotFound';
import withConsumer from "../../hocs/withConsumer";
import { UserConsumer } from "../../contexts/UserContext";

const HomeWithUserConsumer = withConsumer(Home, UserConsumer);

export {
  HomeWithUserConsumer,
  NotFound
};