import CreateCategory from "./Create";
import EditCategory from "./Edit";
import DeleteCategory from "./Delete";
import AllCategories from "./All";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const CreateCategoryWithUserContext = withConsumer(CreateCategory, UserConsumer);
const EditCategoryWithUserContext = withConsumer(EditCategory, UserConsumer);
const DeleteCategoryWithUserContext = withConsumer(DeleteCategory, UserConsumer);
const AllCategoriesWithUserContext = withConsumer(AllCategories, UserConsumer);

export {
  CreateCategoryWithUserContext,
  EditCategoryWithUserContext,
  DeleteCategoryWithUserContext,
  AllCategoriesWithUserContext
};