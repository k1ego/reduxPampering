import { AppThunk } from "../../../shared/redux";
import { UserId, usersSlice } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
      // делаем удаление
      await api.deleteUser(userId);
      // делаем перезагрузку
      await router.navigate("/users");
      // делаем запрос
      await dispatch(fetchUsers({ refetch: true }));
      // только после 3 действий выше происходит "success"
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
    } catch (e) {
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
