import React, { useState, useEffect } from "react";
import axios from "axios";

function SubToDo({ project }) {
  const [subToDos, setSubToDos] = useState(project.subToDos || []);
  const [newSubToDoTitle, setNewSubToDoTitle] = useState("");
  const [editSubToDoId, setEditSubToDoId] = useState(null);
  const [editSubToDoTitle, setEditSubToDoTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setSubToDos(project.subToDos || []);
  }, [project]);

  const handleAddSubToDo = async () => {
    if (!newSubToDoTitle) return;
    try {
      const response = await axios.post(
        `https://todobackend-l1vc.onrender.com/api/subtasks`,
        { projectId: project._id, title: newSubToDoTitle }
      );
      setSubToDos((prevSubToDos) => [...prevSubToDos, response.data]);
      setNewSubToDoTitle("");
    } catch (error) {
      console.error("Error adding sub-task:", error);
    }
  };

  const handleDeleteSubToDo = async (id) => {
    try {
      await axios.delete(`https://todobackend-l1vc.onrender.com/api/subtasks/${id}`);
      setSubToDos((prevSubToDos) => prevSubToDos.filter((subToDo) => subToDo._id !== id));
    } catch (error) {
      console.error("Error deleting sub-task:", error);
    }
  };

  const handleUpdateSubToDo = async (id) => {
    const updatedTitle = editSubToDoTitle.trim() || subToDos.find((item) => item._id === id).title;
    if (!updatedTitle) return alert("Title cannot be empty.");

    setIsUpdating(true);
    try {
      const response = await axios.put(
        `https://todobackend-l1vc.onrender.com/api/subtasks/${id}`,
        { title: updatedTitle }
      );
      setSubToDos((prevSubToDos) =>
        prevSubToDos.map((subToDo) =>
          subToDo._id === id ? { ...subToDo, title: updatedTitle } : subToDo
        )
      );
      setEditSubToDoId(null);
      setEditSubToDoTitle("");
    } catch (error) {
      console.error("Error updating sub-task:", error);
      alert("Failed to update sub-task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mt-8 mb-4 flex items-center justify-between space-x-4">
        <input
          type="text"
          value={newSubToDoTitle}
          onChange={(e) => setNewSubToDoTitle(e.target.value)}
          placeholder="Enter sub-task title"
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
        <button
          onClick={handleAddSubToDo}
          className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700"
        >
          Add Sub-task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{project.title}</h2>
        <h3 className="text-xl font-medium text-gray-600 mb-5">Sub-tasks</h3>

        <ul className="space-y-6">
          {subToDos.length > 0 ? (
            subToDos.map((subToDo) => (
              <li key={subToDo._id} className="flex items-center justify-between bg-gray-100 p-6 rounded-lg">
                {editSubToDoId === subToDo._id ? (
                  <div className="flex items-center w-full space-x-3">
                    <input
                      type="text"
                      value={editSubToDoTitle}
                      onChange={(e) => setEditSubToDoTitle(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full"
                    />
                    <button
                      onClick={() => handleUpdateSubToDo(subToDo._id)}
                      disabled={isUpdating}
                      className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                      {isUpdating ? "Updating..." : "Update"}
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-800 text-xl">{subToDo.title}</span>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      if (editSubToDoId === subToDo._id) {
                        setEditSubToDoId(null);
                        setEditSubToDoTitle("");
                      } else {
                        setEditSubToDoId(subToDo._id);
                        setEditSubToDoTitle(subToDo.title);
                      }
                    }}
                    className="bg-yellow-500 text-white py-2 px-5 rounded-lg hover:bg-yellow-600"
                  >
                    {editSubToDoId === subToDo._id ? "Cancel" : "Edit"}
                  </button>

                  <button
                    onClick={() => handleDeleteSubToDo(subToDo._id)}
                    className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No sub-tasks available. Add one below!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SubToDo;