import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CartDetails from "../Cart/CartDetails"

export function CartDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      
             <svg
                                        className="w-6 h-6 text-gray-300 hover:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3h2l.4 2m0 0L7 13h10l1.6-8H5.4M5.4 5l-1 5h14.2M16 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm-9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
                                        />
                                    </svg>
    
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
       <CartDetails />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
