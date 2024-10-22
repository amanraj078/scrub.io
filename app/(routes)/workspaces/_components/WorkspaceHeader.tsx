import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

function WorkspaceHeader({ onSave, fileName }: any) {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
                <h2>{fileName}</h2>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    className="h-8 gap-2 text-[12px] bg-red-500 hover:bg-red-600"
                    onClick={() => onSave()}
                >
                    Save <Save className="h-4 w-4" />
                </Button>
                <Button className="h-8 gap-2 text-[12px] bg-blue-600 hover:bg-blue-700">
                    Share <Link className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default WorkspaceHeader;
