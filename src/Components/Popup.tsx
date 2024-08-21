import React from "react";

const Popup = ({ message, onClose }: { message: string; onClose: () => void }) => (
    <div className="popup">
        <div className="popup-content">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default Popup;