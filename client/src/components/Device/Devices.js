import CreateDevice from "./Create";
import EditDevice from "./Edit";
import DeleteDevice from "./Delete";
import AllDevices from "./All";
import SearchDevices from "./Search";
import DeviceDetails from "./Details";
import BuyDevices from "./Buy";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const CreateDeviceWithUserContext = withConsumer(CreateDevice, UserConsumer);
const EditDeviceWithUserContext = withConsumer(EditDevice, UserConsumer);
const DeleteDeviceWithUserContext = withConsumer(DeleteDevice, UserConsumer);
const AllDevicesWithUserContext = withConsumer(AllDevices, UserConsumer);
const SearchDevicesWithUserContext = withConsumer(SearchDevices, UserConsumer);
const DeviceDetailsWithUserContext = withConsumer(DeviceDetails, UserConsumer);
const BuyDevicesWithUserContext = withConsumer(BuyDevices, UserConsumer);

export {
  CreateDeviceWithUserContext,
  EditDeviceWithUserContext,
  DeleteDeviceWithUserContext,
  AllDevicesWithUserContext,
  SearchDevicesWithUserContext,
  DeviceDetailsWithUserContext,
  BuyDevicesWithUserContext
};