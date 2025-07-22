"use client"

type Props = {
    noteId: string,
    deletenotelocally: (noteId:string) => void
}

function DeleteNoteButton({noteId, deletenotelocally}: Props) {
  return (
    <div>DeleteNoteButton</div>
  )
}

export default DeleteNoteButton