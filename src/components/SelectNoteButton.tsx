"use client"

import useNote from "@/hooks/useNote"
import { Note } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import Link from "next/link"

type Props = {
    note: Note
}

function SelectNoteButton({note}: Props) {
  const noteId = useSearchParams().get("noteId") || ""
  const {noteText: selectedNoteText} = useNote()
  const [shouldBeGlobalNoteText, setShouldBeGlobalNoteText] = useState(false)
  const [localNoteText, setLocalNoteText] = useState(note.text)

  useEffect(()=>{
    if(noteId === note.id) setShouldBeGlobalNoteText(true)
    else setShouldBeGlobalNoteText(false)
  },[noteId, note.id])

  useEffect(()=>{
    if(shouldBeGlobalNoteText){
      setLocalNoteText(selectedNoteText)
    }
  }, [selectedNoteText, shouldBeGlobalNoteText])

  const blankNoteText = "Empty Note"

  let noteText = localNoteText || blankNoteText
  if(shouldBeGlobalNoteText){
    noteText = selectedNoteText || blankNoteText
  }

  return (
    <SidebarMenuButton asChild className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}>
      <Link href={`/?noteId=${note.id}`}className="flex h-fit flex-col">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
        <p className="text-xs text-muted">{note.updatedAt.toLocaleDateString()}</p>
      </Link>
    </SidebarMenuButton>
  )
}

export default SelectNoteButton