import React, { useState, useEffect } from "react";
import axios from "axios";
import SubToDo from "./SubToDo";
import LandingPage from "./LandingPage";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://todobackend-l1vc.onrender.com/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (!newProjectTitle.trim()) return;

    try {
      const response = await axios.post("https://todobackend-l1vc.onrender.com/api/projects", {
        title: newProjectTitle,
      });
      setProjects([...projects, response.data]);
      setNewProjectTitle("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (projectId, newTitle) => {
    try {
      const response = await axios.put(`https://todobackend-l1vc.onrender.com/api/projects/${projectId}`, {
        title: newTitle,
      });
      setProjects(projects.map((proj) => (proj._id === projectId ? response.data : proj)));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://todobackend-l1vc.onrender.com/api/projects/${projectId}`);
      setProjects(projects.filter((proj) => proj._id !== projectId));
      if (selectedProject && selectedProject._id === projectId) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      <div className="w-1/4 bg-gray-900 p-6 flex flex-col shadow-lg">
        <h2 className="text-2xl mb-6 font-bold text-center">To-Do List</h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            placeholder="Enter task title"
            className="p-2 w-full rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <button
            onClick={handleAddProject}
            className="bg-green-500 py-2 px-4 rounded hover:bg-green-600 transition"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        <ul className="flex-grow overflow-y-auto space-y-2">
          {projects.map((project) => (
            <li
              key={project._id}
              className={`flex items-center justify-between cursor-pointer py-3 px-4 rounded-md transition-all ${
                selectedProject && selectedProject._id === project._id
                  ? "bg-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <span onClick={() => setSelectedProject(project)}>{project.title}</span>

              <div className="flex gap-2">
                <Pencil
                  className="cursor-pointer hover:text-yellow-400"
                  size={18}
                  onClick={() => {
                    const newTitle = prompt("Enter new title:", project.title);
                    if (newTitle) handleUpdateProject(project._id, newTitle);
                  }}
                />
                <Trash2
                  className="cursor-pointer hover:text-red-500"
                  size={18}
                  onClick={() => handleDeleteProject(project._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 bg-white text-black shadow-inner rounded-l-3xl">
        {selectedProject ? <SubToDo project={selectedProject} /> : <LandingPage />}
      </div>
    </div>
  );
}

export default Dashboard;
