import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { core_services } from "../utils/api";

interface EarnCoinsModalProps {
  visible: boolean;
  onClose: () => void;
  onEarnSuccess: () => void;
}

const EarnCoinsModal = ({ visible, onClose, onEarnSuccess }: EarnCoinsModalProps) => {
  const [adKey, setAdKey] = useState(0);

  useEffect(() => {
    if (visible) {
      // Every time the modal opens, change the adKey to remount the <ins> element
      setAdKey(prev => prev + 1);
    }
  }, [visible]);

  useEffect(() => {
    // This effect runs whenever the modal becomes visible or adKey changes
    if (visible && (window as any).adsbygoogle) {
      const adContainer = document.querySelector('.adsbygoogle');
      if (adContainer) {
        // Clear the container's content before trying to load a new ad
        adContainer.innerHTML = '';
      }

      // Push the ad to the queue after a slight delay
      const timer = setTimeout(() => {
        try {
          (window as any).adsbygoogle.push({});
        } catch (e) {
          console.error("Adsense error", e);
        }
      }, 500);

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [visible, adKey]);

  const handleClose = async () => {
    const amount = 1;
    try {
      await core_services.depositAmount({ amount });
      onEarnSuccess();
    } catch (error) {
      console.error("Failed to deposit points:", error);
    }
    onClose();
  };

  return (
    <Modal
      title="Click on this Ad in order to get Coins"
      open={visible}
      onCancel={handleClose}
      centered
        footer={null} 
    >
      <div key={adKey} onClick={handleClose}>
        {/* <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 250 }}
          data-ad-client="ca-pub-4752979085213341"
          data-ad-slot="8750224491"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins> */}
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/8e35bf74288049.5c2a5ab416079.jpg" alt="dummy ads"/>
      </div>
    </Modal>
  );
};

export default EarnCoinsModal;