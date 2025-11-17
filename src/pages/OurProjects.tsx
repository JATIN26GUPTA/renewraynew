import { useState, useEffect } from "react";
import { MapPin, Zap, Loader, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";

interface ProjectData {
  id: string;
  title: string;
  description?: string;
  capacity_kw: number;
  annual_savings: number;
  location: string;
  image_url?: string;
  project_type: string;
}

export default function OurProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with back button */}
            <div className="flex items-center justify-between mb-16">
              <div>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </button>
                <h1 className="text-4xl font-bold text-gray-900">
                  Our Completed Projects
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  Trusted by customers across India
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-700">
                {error}
              </div>
            )}

            {/* Loading state */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  No projects available yet.
                </p>
              </div>
            ) : (
              <>
                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={
                            project.image_url ||
                            "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {project.project_type}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        {project.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">
                              Capacity
                            </p>
                            <div className="flex items-center text-blue-600">
                              <Zap className="h-4 w-4 mr-1" />
                              <span className="font-bold">
                                {project.capacity_kw} kW
                              </span>
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">
                              Annual Savings
                            </p>
                            <p className="text-green-600 font-bold">
                              ₹{(project.annual_savings / 100000).toFixed(1)}L
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm border-t pt-4">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats summary */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">
                        {projects.length}
                      </p>
                      <p className="text-blue-100">Total Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">
                        {projects.reduce((sum, p) => sum + p.capacity_kw, 0)} kW
                      </p>
                      <p className="text-blue-100">Total Capacity</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">
                        ₹
                        {(
                          projects.reduce(
                            (sum, p) => sum + p.annual_savings,
                            0
                          ) / 10000000
                        ).toFixed(1)}
                        Cr+
                      </p>
                      <p className="text-blue-100">Total Annual Savings</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
