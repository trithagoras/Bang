import toast from "react-hot-toast";

const copyToClipboard = (message: string | null) => {
    if (!message) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message)
        .then(() => toast.success("Copied!"))
        .catch(() => toast.error("Failed to copy"));
    } else {
        // fallback for HTTP / older browsers
        const textarea = document.createElement("textarea");
        textarea.value = message;
        textarea.style.position = "fixed"; // prevent scroll jump
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
        const successful = document.execCommand("copy");
        if (successful) {
            toast.success("Copied!");
        } else {
            toast.error("Failed to copy");
        }
        } catch (err) {
        toast.error("Failed to copy");
        }

        document.body.removeChild(textarea);
    }
}

export default copyToClipboard;
