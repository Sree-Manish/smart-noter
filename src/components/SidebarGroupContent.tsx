"use client"

import { Note } from '@prisma/client'
import { SidebarGroupContent, SidebarMenu, SidebarMenuItem } from './ui/sidebar'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'
import { useEffect, useMemo, useState } from 'react'
import Fuse from "fuse.js"
import SelectNoteButton from './SelectNoteButton'
import DeleteNoteButton from './DeleteNoteButton'

type Props = {
    notes: Note[]
}

function SidebarGroupContentComp({notes}: Props){
    const [searchText, setSearchText] = useState("")
    const [localNotes, setLocalNotes] = useState(notes)

    useEffect(()=>{
        setLocalNotes(notes)
    },[notes])

    const fuse = useMemo(()=>{
        return new Fuse(localNotes, {
            keys: ["text"],
            threshold: 0.4
        })
    }, [localNotes])

    const filteredNotes = searchText ? fuse.search(searchText).map((result) => result.item) : localNotes

    const deletenotelocally = (noteId: string) => {
        setLocalNotes((prev) => 
            prev.filter((note) => note.id!==noteId)
        )
    }

  return (
    <SidebarGroupContent>
        <div className='relative flex items-center'>
            <SearchIcon className="absolute left-2 size-4" />
            <Input
            className="bg-muted p1-8"
            placeholder = "Search your notes ..."
            value={searchText}
            onChange={(e)=>{setSearchText(e.target.value)}} />
        </div>

        <SidebarMenu className="mt-4">
            {filteredNotes.map((note)=>{
                return (
                    <SidebarMenuItem key={note.id} className="group/item">
                        <SelectNoteButton note={note} />
                        <DeleteNoteButton 
                        noteId={note.id}
                        deletenotelocally={deletenotelocally} />
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    </SidebarGroupContent>
  )
}

export default SidebarGroupContentComp