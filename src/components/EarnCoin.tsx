import { useEffect } from "react";
import { Modal, Button } from "antd";
import { core_services } from "../utils/api";

interface EarnCoinsModalProps {
    visible: boolean;
    onClose: () => void;
    onEarnSuccess: () => void;
}

const EarnCoinsModal = ({ visible, onClose, onEarnSuccess }: EarnCoinsModalProps) => {
    // Simulate ad loaded and watched event
    // In real Google Adsense, this would be handled differently

    const handleClose = async () => {
        const amount = 1
        try {
            await core_services.depositAmount({ amount })
            onEarnSuccess();
        } catch (error) {
            console.error("Failed to deposit points:", error);
        }
        onClose();
    };

    return (
        <Modal
            title="Watch an Ad & Earn Coins"
            visible={visible}
            onCancel={handleClose}
            footer={[
                <Button key="close" onClick={handleClose}>
                    Close & Earn
                </Button>,
            ]}
            centered
        >
            <div className="text-center">
                <div
                    style={{
                        width: "100%",
                        height: 250,
                        backgroundColor: "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        fontSize: 16,
                        color: "#555",
                    }}
                >
                    Google ad daal denge
                </div>
            </div>
        </Modal>
    );
};

export default EarnCoinsModal;
