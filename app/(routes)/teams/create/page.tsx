"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, useSonner } from "sonner";

function CreateTeam() {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const createTeam = useMutation(api.teams.createTeam);
    const { user }: any = useKindeBrowserClient();

    const createNewTeam = () => {
        createTeam({
            teamName: teamName,
            createdBy: user?.email,
        }).then((res) => {
            console.log(res);
            if (res) {
                router.push("/dashboard");
                toast("Team created successfully");
            }
        });
    };
    return (
        <div className="px-8 md:px-16 my-16">
            <div className="flex items-center gap-1">
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
                <h2 className="font-bold text-2xl">scrub.io</h2>
            </div>
            <div className="flex flex-col items-center mt-8">
                <h2 className="font-bold text-[40px] py-3">
                    What should we call your team?
                </h2>
                <h2 className="text-gray-500">
                    You can always change this later from settings.
                </h2>
                <div className="mt-9 w-[40%]">
                    <label className="font-medium text-gray-700">
                        Team name
                    </label>
                    <Input
                        placeholder="Team name"
                        onChange={(e) => setTeamName(e.target.value)}
                        className="mt-1"
                    />
                </div>
                <Button
                    className="bg-blue-700 mt-12 w-[25%] hover:bg-blue-700/75"
                    disabled={!(teamName && teamName?.length > 0)}
                    onClick={createNewTeam}
                >
                    Create Team
                </Button>
            </div>
        </div>
    );
}

export default CreateTeam;
