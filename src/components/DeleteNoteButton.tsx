"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { deleteNoteAction } from "@/actions/notes"

type Props = {
    noteId: string,
    deletenotelocally: (noteId:string) => void
}

function DeleteNoteButton({noteId, deletenotelocally}: Props) {

  const router = useRouter()
  const noteIdParam = useSearchParams().get("noteId") || ""

  const [isPending, startTransition] = useTransition()

  const handleDeleteNote = () => {
    startTransition(async () => {
      const {errorMessage} = await deleteNoteAction(noteId)

      if(!errorMessage){
        toast.success("Note Deleted",{
          description: "You have successfully deleted the note"
        })
        deletenotelocally(noteId)

        if(noteId === noteIdParam){
          router.replace("/")
        } 
      } else {
        toast.error("Error", {
          description: errorMessage
        })
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
        variant="ghost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Note?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this note from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick = {handleDeleteNote}
          className="w-24 bg-destructive text-destructive hover:bg-destructive/90">
            {isPending ? <Loader2 className="animate-spin "/> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteNoteButton