import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.Id) {
        const res = await getPost(params.Id);
        setPost(res);
      }
    })();
  }, [params.Id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-indigo-900">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nueva publicacion</h3>
          <Link
            to="/"
            className="text-gray-400 text-sm hover:text-indigo-600 transition"
          >
            Volver
          </Link>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("El titulo es requerido"),
            description: Yup.string().required("La description es requerida"),
          })}
          onSubmit={async (values, actions) => {
            if (params.Id) {
              await updatePost(params.Id, values);
              toast.success("Publicacion actualizada!");
            } else {
              await createPost(values);
              toast.success("Publicacion creada!");
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Titulo
              </label>
              <Field
                name="title"
                placeholder="titulo"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Descripcion
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="descripcion"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                className="block mb-2 text-sm font-medium text-gray-300"
                htmlFor="file_input"
              >
                Imagen
              </label>
              <input
                className="block w-full text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                aria-describedby="file_input_help"
                name="image"
                type="file"
                accept="image/x-png,image/gif,image/jpeg, image/svg,  image/jpg"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <p className="mt-1 text-sm text-gray-300" id="file_input_help">
                SVG, PNG, JPG or GIF.
              </p>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Publicar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
