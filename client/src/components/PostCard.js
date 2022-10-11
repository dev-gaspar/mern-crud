import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Estas seguro que quieres eliminar esta publicacion?
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-2 py-1  md:px-3 md:py-2 text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
                toast.success("Publicacion eliminada!");
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-500 hover:bg-slate-400 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer overflow-hidden transition      "
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-2 py-2 md:px-4 md:py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-sm md:text-xl">
            {post.title}
          </h3>
          <button
            className="bg-red-500 hover:bg-red-400 text-sm px-2 py-1 rounded-sm transition"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            <MdDelete />
          </button>
        </div>
        <p className="text-gray-400 text-xs md:text-base">{post.description}</p>
      </div>

      {post.image && (
        <img
          src={post.image.url}
          alt={post.title}
          className=" rounded-md object-cover w-full h-full"
        />
      )}
    </div>
  );
}
