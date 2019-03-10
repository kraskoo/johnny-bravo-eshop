import CreateCategory from "./Create";
import AllCategories from "./All";
import { UserConsumer } from "../../contexts/UserContext";
import withConsumer from "../../hocs/withConsumer";

const CreateCategoryWithUserContext = withConsumer(CreateCategory, UserConsumer);
const AllCategoriesWithUserContext = withConsumer(AllCategories, UserConsumer);

export {
  CreateCategoryWithUserContext,
  AllCategoriesWithUserContext
};