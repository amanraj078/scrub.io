import React, { useState } from "react";
import { Archive, Flag, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
    const [fileInput, setFileInput] = useState("");
    const menuList = [
        {
            id: 1,
            name: "Getting started",
            icon: Flag,
            path: "",
        },
        {
            id: 2,
            name: "Github",
            icon: Terminal,
            path: "",
        },
        {
            id: 3,
            name: "Archive",
            icon: Archive,
            path: "",
        },
    ];
    return (
        <div>
            {menuList.map((menu, index) => (
                <h2
                    key={index}
                    className="flex gap-2 p-2 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer font-semibold"
                >
                    <menu.icon className="text-gray-600 h-5 w-5" />
                    {menu.name}
                </h2>
            ))}

            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3">
                        New File
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new file</DialogTitle>
                        <DialogDescription>
                            <Input
                                placeholder="Enter File Name"
                                className="mt-3"
                                onChange={(e) => setFileInput(e.target.value)}
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={!(fileInput && fileInput.length > 0)}
                                onClick={() => onFileCreate(fileInput)}
                            >
                                Create
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="h-3 w-full bg-gray-200 rounded-full mt-5">
                <div
                    className={`h-3 bg-red-500 rounded-full`}
                    style={{ width: `${(totalFiles / 5) * 100}%` }}
                ></div>
            </div>
            <h2 className="text-[12px] mt-3">
                <strong>{totalFiles}</strong> out of <strong>5</strong> files
                used
            </h2>
            <h2 className="text-[12px] mt-1">Upgrade for unlimited access</h2>
        </div>
    );
}

export default SideNavBottomSection;
