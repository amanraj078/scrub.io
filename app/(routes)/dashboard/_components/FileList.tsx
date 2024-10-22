import { FileListContext } from "@/app/_context/FileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TEAM } from "./SideNavTopSection";

export interface FILE {
    archive: boolean;
    createdBy: string;
    document: string;
    fileName: string;
    teamId: string;
    whiteboard: string;
    _id: string;
    _creationTime: number;
}

function FileList() {
    const { user }: any = useKindeBrowserClient();
    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<FILE[]>([]);
    const router = useRouter();
    const [activeTeam, setActiveTeam] = useState<TEAM | any>(null);
    const [totalFiles, setTotalFiles] = useState<Number>();

    const convex = useConvex();

    // Fetch active team
    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, {
            email: user.email!,
        });
        if (result.length > 0) {
            setActiveTeam(result[0]);
        } else {
            console.error("No active team found.");
        }
    };

    // Fetch files for the active team
    const getFiles = async () => {
        if (!activeTeam || !activeTeam._id) {
            console.error("No active team available.");
            return [];
        }

        const result = await convex.query(api.files.getFiles, {
            teamId: activeTeam._id,
        });
        setTotalFiles(result?.length);
        return result;
    };

    const deleteFile = useMutation(api.files.deleteFile);

    const onDeleteFile = async (fileId: any) => {
        console.log("Deleting file with ID:", fileId);
        await deleteFile({ _id: fileId });
        const updatedFiles = await getFiles();
        setFileList_(updatedFiles);
    };

    useEffect(() => {
        if (fileList_) {
            setFileList(fileList_);
        }
    }, [fileList_]);

    useEffect(() => {
        if (user) {
            getTeamList();
        }
    }, [user]);

    useEffect(() => {
        const fetchFiles = async () => {
            const files = await getFiles();
            setFileList(files);
        };

        if (activeTeam) {
            fetchFiles();
        }
    }, [activeTeam]);

    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                FileName
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Created At
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Edited
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Author
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {fileList.map((file: FILE, index: number) => (
                            <tr
                                key={file._id}
                                className="odd:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                    router.push("/workspaces/" + file._id)
                                }
                            >
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {file.fileName}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {moment(file._creationTime).format(
                                        "DD MMM YYYY"
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {moment(file._creationTime).format(
                                        "DD MMM YYYY"
                                    )}
                                </td>
                                <td className="flex gap-2 items-center font-medium whitespace-nowrap px-4 py-2 text-gray-700">
                                    {user && (
                                        <Image
                                            src={user.picture}
                                            alt="user"
                                            width={30}
                                            height={30}
                                            className="rounded-full"
                                        />
                                    )}
                                    {user && user.given_name}
                                </td>
                                <td
                                    className="whitespace-nowrap px-4 py-2 text-gray-700"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="gap-3">
                                                <Archive className="h-4 w-4" />{" "}
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="gap-3 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents row click
                                                    onDeleteFile(file._id);
                                                }}
                                            >
                                                <Trash className="h-4 w-4" />{" "}
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FileList;
