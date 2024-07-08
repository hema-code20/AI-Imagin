import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField } from "../components";

const Home = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ai-image-generator-app-e9f5.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://ai-image-generator-app-e9f5.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide a prompt");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = form.photo;
    link.download = "generated_image.jpg";
    link.click();
  };

  return (
    <section>
      <div className="flex flex-row">
        <div className="mt-0 absolute right-10 border border-teal-900 rounded-lg w-5/12 p-2 h-2/3">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-contain opacity-40"
            />
          )}
        </div>
        <form
          className="mt-5 flex flex-col gap-10 max-w-xl-10 w-full md:w-1/2"
          onSubmit={handleSubmit}
        >
          <FormField
            labelName="Name"
            type="text"
            name="name"
            placeholder="Ex., kenny desan"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Unleash Your Digital Muse: Inspire AI to Paint Your Imagination.."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="ml-40 w-full md:w-1/2 flex items-center">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-teal-600 font-medium rounded-md text-md w-full sm:w-auto px-7 py-1.5 text-center"
              disabled={generatingImg}
            >
              {generatingImg ? "Imaginating..." : "Imagin"}
            </button>
            {form.photo && (
              <IoMdDownload
                className="ml-4 cursor-pointer text-teal-600 text-2xl"
                onClick={handleDownload}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
