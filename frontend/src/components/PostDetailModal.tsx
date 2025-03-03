interface Props {
  id: number,
  title: string,
  description?: string,
  created_at: string,
  files: File[]
}

interface File {
  id: number,
  filename: string
}

const PostDetailModal: React.FC<Props> = ({ id, title, description, created_at, files }) => {
  //.png', '.jpg', '.jpeg', '.mp4', '.mov
  const imgExtensions = ['png', 'jpg', 'jpeg']
  const videoExtensions = ['mp4', 'mov']
  return (
    <dialog id={`post_detail_modal_${id}`} className="modal">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{description === '' ? "No description is given" : description}</p>
        <p>Created At : {created_at}</p>
        <div className="divider"></div>
        {/* Slider */}
        <div className="carousel w-full">
          {files.map((file, idx) => (
            <div key={idx} id={`${id}_slide${idx}`} className="carousel-item relative w-full">
              {
                imgExtensions.includes(file.filename.split('.').pop() || "") ? <img src={`${import.meta.env.VITE_MEDIA_URL}/${file.filename}`} /> :
                videoExtensions.includes(file.filename.split('.').pop() || "") ? <video src={`${import.meta.env.VITE_MEDIA_URL}/${file.filename}`} controls={true} /> : <></>
              }
              {
                files.length > 1 ? <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href={`#${id}_slide${idx === 0 ? files.length - 1 : idx - 1}`} className="btn btn-circle">❮</a>
                  <a href={`#${id}_slide${idx === files.length - 1 ? 0 : idx + 1}`} className="btn btn-circle">❯</a>
                </div> : <></>
              }
            </div>
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default PostDetailModal