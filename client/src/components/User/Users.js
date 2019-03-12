import Register from "./Register/Register";
import Login from "./Login/Login";
import SetAdminRole from "./Admin/SetAdminRole/SetAdminRole";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const RegisterWithUserConsumer = withConsumer(Register, UserConsumer);
const LoginWithUserConsumer = withConsumer(Login, UserConsumer);
const SetAdminRoleWithUserConsumer = withConsumer(SetAdminRole, UserConsumer);

export { LoginWithUserConsumer, RegisterWithUserConsumer, SetAdminRoleWithUserConsumer };