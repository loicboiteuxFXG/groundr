import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MatchModal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close the modal if click is outside of it
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return isOpen ? (
        <div className="modal-overlay">
            <div ref={modalRef} className="custom-modal">
                {children}
            </div>
        </div>
    ) : null;
};

MatchModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default MatchModal;