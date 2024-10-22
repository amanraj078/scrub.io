import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function Canvas({
    onSaveTrigger,
    fileId,
    fileData,
}: {
    onSaveTrigger: any;
    fileId: any;
    fileData: FILE;
}) {
    const [whiteBoard, setWhiteBoard] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    useEffect(() => {
        onSaveTrigger && saveWhiteBoard();
    }, [onSaveTrigger]);

    const saveWhiteBoard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoard),
        }).then((resp) => console.log(resp));
    };

    return (
        <div style={{ height: "530px" }}>
            {fileData && (
                <Excalidraw
                    onChange={(excalidraw, appState, canvas) =>
                        setWhiteBoard(excalidraw)
                    }
                    theme="light"
                    initialData={{
                        elements:
                            fileData?.whiteboard &&
                            JSON.parse(fileData?.whiteboard),
                    }}
                    UIOptions={{
                        canvasActions: {
                            saveToActiveFile: false,
                            loadScene: false,
                            export: false,
                            toggleTheme: false,
                        },
                    }}
                >
                    <MainMenu>
                        <MainMenu.DefaultItems.Export />
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    );
}

export default Canvas;
