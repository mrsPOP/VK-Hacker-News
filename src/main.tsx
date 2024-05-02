import { createRoot } from "react-dom/client";
import vkBridge from "@vkontakte/vk-bridge";
import { AppConfig } from "./app/AppConfig.tsx";

vkBridge.send("VKWebAppInit");

createRoot(document.getElementById("root")!).render(<AppConfig />);

