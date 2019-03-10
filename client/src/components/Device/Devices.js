import CreateDevice from "./Create";
import AllDevices from "./All";
import DeviceDetails from "./Details";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const CreateDeviceWithUserContext = withConsumer(CreateDevice, UserConsumer);
const AllDevicesWithUserContext = withConsumer(AllDevices, UserConsumer);
const DeviceDetailsWithUserContext = withConsumer(DeviceDetails, UserConsumer);

export {
  CreateDeviceWithUserContext,
  AllDevicesWithUserContext,
  DeviceDetailsWithUserContext
};