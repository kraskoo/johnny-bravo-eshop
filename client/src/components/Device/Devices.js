import CreateDevice from "./Create";
import EditDevice from "./Edit";
import DeleteDevice from "./Delete";
import AllDevices from "./All";
import DeviceDetails from "./Details";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const CreateDeviceWithUserContext = withConsumer(CreateDevice, UserConsumer);
const EditDeviceWithUserContext = withConsumer(EditDevice, UserConsumer);
const DeleteDeviceWithUserContext = withConsumer(DeleteDevice, UserConsumer);
const AllDevicesWithUserContext = withConsumer(AllDevices, UserConsumer);
const DeviceDetailsWithUserContext = withConsumer(DeviceDetails, UserConsumer);

export {
  CreateDeviceWithUserContext,
  EditDeviceWithUserContext,
  DeleteDeviceWithUserContext,
  AllDevicesWithUserContext,
  DeviceDetailsWithUserContext
};