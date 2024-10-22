import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const [activeTeam, setActiveTeam] = useState<TEAM | any>();
    const [totalFiles, setTotalFiles] = useState<Number>();
    const convex = useConvex();
    const { fileList_, setFileList_ } = useContext(FileListContext);

    useEffect(() => {
        activeTeam && getFiles();
    }, [activeTeam]);

    const createFile = useMutation(api.files.createFile);
    const onFileCreate = (fileName: string) => {
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id,
            createdBy: user?.email,
            archive: false,
            document: "",
            whiteboard: "",
        }).then((resp) => {
            if (resp) {
                getFiles();
                toast.success("File created Successfully");
            }
        }),
            () => {
                toast("Error while creating file");
            };
    };

    const getFiles = async () => {
        const result = await convex.query(api.files.getFiles, {
            teamId: activeTeam?._id,
        });
        console.log(result);
        setFileList_(result);
        setTotalFiles(result?.length);
    };

    return (
        <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
            <div className="flex-1">
                {user && (
                    <SideNavTopSection
                        setActiveTeamInfo={(activeTeam: TEAM) =>
                            setActiveTeam(activeTeam)
                        }
                        user={user}
                    />
                )}
            </div>
            <div>
                <SideNavBottomSection
                    totalFiles={totalFiles}
                    onFileCreate={onFileCreate}
                />
            </div>
        </div>
    );
}

export default SideNav;
