import { getTodo, editTodo } from "../utils/data-todos";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const todo = getTodo(params.id);

  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const handleSave = () => {
    editTodo({
      id: todo.id,
      title: title,
      description: description,
      is_finished: todo.is_finished,
    });

    navigate(`/`);
  };

  const badgeStatus = todo.is_finished ? (
    <span className="badge bg-success">Selesai</span>
  ) : (
    <span className="badge bg-warning">Proses</span>
  );
  let resultRender;
  if (todo) {
    resultRender = (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card mt-3">
              <div className="card-body">
                <h3>
                  {todo.title} {badgeStatus}
                </h3>
                <hr />
                <div>
                  {todo.is_finished ? (
                    <div>
                      <Icon.Check /> Selesai pada:
                      <span className="ms-2 text-success">
                        {formatDate(todo.updated_at)}
                      </span>
                    </div>
                  ) : null}
                  <div className="text-middle">
                    <Icon.Clock /> Dibuat pada:
                    <span className="ms-2 text-muted">
                      {formatDate(todo.created_at)}
                    </span>
                  </div>
                </div>
                <hr />
                <p>{todo.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    resultRender = <p>Tidak ada catatan</p>;
  }
  return resultRender;
}
export default DetailPage;
