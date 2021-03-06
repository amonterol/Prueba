import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem } from "../store/Actions";
import { deleteData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state;

  const router = useRouter();

  const deletePropertyTypes = (item) => {
    deleteData(`propertyTypes/${item.id}`).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(deleteItem(item.data, item.id, item.type));
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteOwners = (item) => {
    deleteData(`owners/${item.id}`).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(deleteItem(item.data, item.id, item.type));
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteProperty = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`property/${item.id}`).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push("/");
    });
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "ADD_PROPERTY_TYPE") {
          deletePropertyTypes(item);
        }
        if (item.type === "ADD_OWNER") {
          deleteOwners(item);
        }
        if (item.type === "DELETE_PROPERTY") {
          deleteProperty(item);
        }
        dispatch({ type: "ADD_MODAL", payload: [] });
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-capitalize" id="exampleModalLabel">
              {modal.length !== 0 && modal[0].title && modal[0].id}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Do you want to delete this item?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
