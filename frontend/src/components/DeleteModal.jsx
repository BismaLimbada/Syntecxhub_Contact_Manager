function DeleteModal({ contactName, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Contact</h2>
          <button className="close-btn" onClick={onCancel}>&times;</button>
        </div>
        
        <p className="delete-modal-text">
          Are you sure you want to delete <strong>{contactName}</strong>? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;