import { useEffect, useState } from "react";

function SiteContent() {
  const [sections, setSections] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [message, setMessage] = useState("");

  const loadSections = () => {
    fetch("https://digital-menu-backend-731h.onrender.com/api/sections")
      .then((response) => response.json())
      .then((data) => {
        setSections(data);
      })
      .catch((error) => {
        console.log("Sections error:", error);
      });
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleImageChange = (sectionId, file) => {
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [sectionId]: file,
    }));
  };

  const handleUpdate = async (id) => {
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    const image = selectedImages[id];

    if (!image) {
      setMessage("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `https://digital-menu-backend-731h.onrender.com/api/sections/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Update failed.");
        return;
      }

      setMessage("Image updated successfully.");

      setSelectedImages((prevImages) => ({
        ...prevImages,
        [id]: null,
      }));

      loadSections();
    } catch (error) {
      console.log("Update section error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="page-title">Site Content</h1>

      <p className="site-content-description">
        Update images used in the Digital Menu.
      </p>

      {sections.map((section) => (
        <div
          className="card site-content-card p-4 mb-4"
          key={section.id}
        >
          <h4 className="section-title">
            {section.section_name}
          </h4>

          {section.image ? (
            <img
              src={section.image}
              alt={section.section_name}
              className="section-preview"
            />
          ) : (
            <div className="no-section-image">
              No image uploaded
            </div>
          )}

          <label className="section-label">
            Choose new image
          </label>

          <input
            type="file"
            className="form-control section-file-input"
            accept="image/*"
            onChange={(event) =>
              handleImageChange(
                section.id,
                event.target.files[0]
              )
            }
          />

          <button
            type="button"
            className="btn update-section-btn"
            onClick={() => handleUpdate(section.id)}
          >
            Update Image
          </button>
        </div>
      ))}

      {message && (
        <div className="alert alert-info site-content-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default SiteContent;