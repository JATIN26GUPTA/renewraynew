import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, LogOut, Loader, AlertCircle } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface Project {
  id: string;
  title: string;
  capacity_kw: number;
  annual_savings: number;
  location: string;
  project_type: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { admin, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    capacity_kw: "",
    annual_savings: "",
    location: "",
    image_url: "",
    project_type: "residential",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    fetchProjects();
  }, [isAuthenticated, navigate]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      setError("Failed to load projects");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Authentication required");
        return;
      }

      if (editingProjectId) {
        // Update existing project
        const { error: updateError } = await supabase
          .from("projects")
          .update({
            title: formData.title,
            description: formData.description,
            capacity_kw: parseFloat(formData.capacity_kw),
            annual_savings: parseFloat(formData.annual_savings),
            location: formData.location,
            image_url: formData.image_url,
            project_type: formData.project_type,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProjectId);

        if (updateError) throw updateError;
        setError(null);
      } else {
        // Create new project
        const { error: insertError } = await supabase.from("projects").insert([
          {
            title: formData.title,
            description: formData.description,
            capacity_kw: parseFloat(formData.capacity_kw),
            annual_savings: parseFloat(formData.annual_savings),
            location: formData.location,
            image_url: formData.image_url,
            project_type: formData.project_type,
            created_by: user.id,
          },
        ]);

        if (insertError) throw insertError;
      }

      setFormData({
        title: "",
        description: "",
        capacity_kw: "",
        annual_savings: "",
        location: "",
        image_url: "",
        project_type: "residential",
      });
      setEditingProjectId(null);
      setShowAddForm(false);
      await fetchProjects();
    } catch (err) {
      setError(
        editingProjectId ? "Failed to update project" : "Failed to add project"
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description || "",
      capacity_kw: project.capacity_kw.toString(),
      annual_savings: project.annual_savings.toString(),
      location: project.location,
      image_url: project.image_url || "",
      project_type: project.project_type,
    });
    setEditingProjectId(project.id);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setFormData({
      title: "",
      description: "",
      capacity_kw: "",
      annual_savings: "",
      location: "",
      image_url: "",
      project_type: "residential",
    });
    setEditingProjectId(null);
    setShowAddForm(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (deleteError) throw deleteError;
      await fetchProjects();
    } catch (err) {
      setError("Failed to delete project");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RenewRay Admin</h1>
            <p className="text-gray-600 mt-1">Welcome, {admin?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Completed Projects
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Add Project</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProjectId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="e.g., Residential Villa, Kota"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.project_type}
                    onChange={(e) =>
                      setFormData({ ...formData, project_type: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Capacity (kW) *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity_kw}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity_kw: e.target.value })
                    }
                    required
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Annual Savings (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.annual_savings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        annual_savings: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="e.g., 45000"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="e.g., Kota, Rajasthan"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none resize-none"
                  placeholder="Project details and achievements..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      {editingProjectId ? "Updating..." : "Adding..."}
                    </>
                  ) : editingProjectId ? (
                    "Update Project"
                  ) : (
                    "Add Project"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.location}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {project.project_type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Capacity</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {project.capacity_kw} kW
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Annual Savings</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(project.annual_savings / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-6">
              No projects yet. Create one to get started!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Project</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
