import { createContext, useContext, useState, useCallback } from "react";
type NotificationType = "success" | "error" | "warning";

const NotificationContext = createContext({
    showNotification: () => { },
});

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used inside NotificationProvider");
    return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const showNotification = useCallback((title: string, description: string, type: NotificationType, duration: number) => {
        setNotification({ title, description, type, duration });
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        setTimeout(() => {
            setNotification(null);
        }, 3500);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {notification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]">
                    <div
                        className={`relative px-5 py-3 rounded-full shadow-lg text-white min-w-[200px] max-w-sm text-left transition-all duration-300
              ${isVisible ? "animate-bounceIn" : "animate-bounceOut"}
              bg-bg1 border
              ${notification.type === "success" && "border-green-400 "}
              ${notification.type === "error" && "border-red-400 "}
              ${notification.type === "warning" && "border-yellow-400 "}
            `}
                    >
                        <div className="font-semibold text-md">{notification.title}</div>
                        <div className="text-sm text-white/90 mt-1">{notification.description}</div>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
};
