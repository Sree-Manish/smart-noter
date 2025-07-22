"use client"

import React,{useState} from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/users';

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        const { errorMessage } = await logoutAction();
        const errmsg = null;
        if(!errmsg){
            toast.success( "Logged Out",{
                description: "You have been logged out successfully",
            })
            router.push("/")
        } else {
            toast.error( "Error",{
                description: "Error Logging Out",
            })
        }
    }

    return (
        <Button variant="outline" onClick={handleLogout} disabled={loading} >
            { loading? <Loader2 className="animate-spin" /> : "Log Out" }
        </Button>
    )
}

export default LogoutButton